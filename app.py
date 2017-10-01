# -*- coding: utf-8 -*-
from chatterbot import ChatBot

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)



# Uncomment the following lines to enable verbose logging
# import logging
# logging.basicConfig(level=logging.INFO)

# Create a new instance of a ChatBot
chatbot = ChatBot(
    'Charlie',
    trainer='chatterbot.trainers.ListTrainer'
)

myList = []

def readConv():
	del myList[:]
	f = open("conv.txt","r") #opens file with name of "conv.txt"
	for line in f:
	    myList.append(line)
	f.close()  

def writeConv():
	f = open("conv.txt","w")
	for i in range(len(myList)):
		f.write(myList[i])
		if i == len(myList):
			f.write("{}\n".format(myList[i]))
		print i
	f.close()


def delConv():
	f = open("conv.txt","w")
	f.write('')
	f.close()
# hs.write("{}\n".format(name))

def appendConv(msg):
	
	f = open("conv.txt","a") #opens file with name of "test.txt"

	f.write(msg)

	f.close()



readConv()
chatbot.train(myList)

# chatbot.train([
#     "what is the greatest company in the world ?",
#     "botler.io is the greatset company ",
#     "who is the true ninja developer on the earth ? ",
#     "Ahmed Akef is the true ninja developer ",
#     "give me your CV ",
#     "https://www.visualcv.com/app/#/cvs/2913679"
# ])
# U_input = raw_input('Type something to begin...\n')
# print(U_input)
# print("Type something to begin...")

# Get a response to the input text 'How are you?'
# response = chatbot.get_response(U_input)

# print(response)



@app.route('/')
def hello_world():
	readConv()
   	return render_template("index.html", var1=myList)

@app.route('/process', methods=['POST'])
def process():

	
	answer = request.form['answer']

	if answer:
		newName = chatbot.get_response(answer)
		kofa = str(newName)
		return jsonify({'name' : kofa})

	return jsonify({'error' : 'Missing data!'})

@app.route('/addMsg', methods=['POST'])
def addMsg():

	msg = request.form['msg']
	

	if msg:
		readConv()
		if len(myList) == 0:
			myList.append(msg)
		else:	
			myList.append("\n{}".format(msg))
		writeConv()
		return jsonify({'name' : 'Done', 'list': myList})

	return jsonify({'error' : 'Missing data!'})

@app.route('/train', methods=['POST'])
def train():
	readConv()
	chatbot.train(myList)
	return jsonify({'name' : 'Done'})

@app.route('/delete', methods=['POST'])
def delete():
	delConv()
	readConv()
	return jsonify({'name' : 'Done', 'list': myList})	

if __name__ == '__main__':
   app.run('0.0.0.0','9999')
