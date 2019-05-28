# -*- coding:utf-8 -*-
import os
from flask import Flask, render_template, json, request
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'ksy1452254'
app.config['MYSQL_DATABASE_DB'] = 'chatroom'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'

app.secret_key = 'you will never know'
mysql.init_app(app)


@app.route('/')
def index():
    return render_template('chat.html')


# 添加一条聊天记录
@app.route('/add_chat_info', methods=['POST'])
def add_notice():
    try:
        name = request.form['Name']
        content = request.form['Content']
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.callproc('sp_addChatInfo', (name, content))
        data = cursor.fetchall()
        if len(data) is 0:
            conn.commit()    # 成功加入，读出当前数据库中所有的聊天记录
            cursor.callproc('sp_getChatInfo',)
            chat_infos = cursor.fetchall()
            chats = []
            for c in chat_infos:
                c_dict={
                    'Name': c[0],
                    'Date': c[1],
                    'Content':c[2]
                }
                chats.append(c_dict)
            return json.dumps(chats)
        else:
            return json.dumps({'status': "信息出错！"})
    except Exception as e:
        print e
        return json.dumps({'status': str(e)})
    finally:
        cursor.close()
        conn.close()


# 获得该聊天室里的聊天记录
@app.route('/get_chat_info', methods=['GET'])
def get_chat_info():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.callproc('sp_getChatInfo',)
        chat_infos = cursor.fetchall()
        chats = []
        for c in chat_infos:
            c_dict = {
                'Name': c[0],
                'Date': c[1],
                'Content': c[2]
            }
            chats.append(c_dict)
        return json.dumps(chats)
    except Exception as e:
        print e
        return json.dumps({'status': str(e)})
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
