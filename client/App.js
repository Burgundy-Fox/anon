import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import io from 'socket.io-client'

export default function App() {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const socket = io('http://localhost:4000')
        socket.on('chat message', (msg) => {
            setMessages([...messages, msg])
        })
    }, [])
    function submitChatMessage() {
        const socket = io('http://localhost:4000')
        socket.emit('chat message', message);
        setMessage('');
    }

    return (
        <View style={styles.container}>
            <Text>Hello testing the socket.io app</Text>
            <View style={styles.container}>
                {messages}
                {console.log(messages)}
                <TextInput
                    style={{ height: 40, borderWidth: 2, top: 600 }}
                    autoCorrect={false}
                    value={message}
                    onSubmitEditing={() => submitChatMessage()}
                    onChangeText={(message) => {
                        setMessage(message)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
