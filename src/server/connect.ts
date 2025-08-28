import Paho from 'paho-mqtt';

// MQTT 브로커 설정
// const host = 'broker.hivemq.com'; // 예시 공개 브로커, 사용자 브로커로 교체
// const port = 8000; // HiveMQ의 WebSocket 포트, 일반적으로 wss의 경우 8080 또는 8000
const host = 'broker.emqx.io'; // 예시 공개 브로커, 사용자 브로커로 교체
const port = 8083; // HiveMQ의 WebSocket 포트, 일반적으로 wss의 경우 8080 또는 8000
const clientId = 'web_client_' + Math.random().toString(36).substring(2, 15); // 고유한 클라이언트 ID

let client: Paho.Client;
let isConnected: boolean = false;

export function connectMqtt() {
    client = new Paho.Client(host, Number(port), clientId);

    // 콜백 핸들러 설정
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.onMessageDelivered = onMessageDelivered;

    // 클라이언트 연결
    console.log('MQTT 브로커에 연결 중: ' + host + ':' + port);
    const options = {
        onSuccess: onConnect,
        onFailure: onFailure,
        timeout: 3,
    }
    client.connect(options);
}

function onConnect() {
    // 연결되면 토픽 구독
    console.log('MQTT 브로커에 연결되었습니다!');
    isConnected = true;
    client.subscribe('topic'); // 원하는 토픽 구독
    console.log('토픽 구독됨: topic');

    // 메시지 발행
    const message = new Paho.Message('Webpack에서 보낸 메시지입니다!');
    message.destinationName = 'topic';
    client.send(message);
    console.log('메시지 발행됨: "Webpack에서 보낸 메시지입니다!" to topic');
}

function onFailure(responseObject: Paho.MQTTError) {
    console.log('연결 실패: ' + responseObject.errorMessage);
    isConnected = false;
}

let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

function onConnectionLost(responseObject: Paho.MQTTError) {
    isConnected = false;
    if (responseObject.errorCode !== 0) {
        console.log('연결 끊김: ' + responseObject.errorMessage);
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttempts++;
            console.log(`재연결 시도 중... (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
            setTimeout(connectMqtt, 5000);
        } else {
            console.log('최대 재연결 시도 횟수에 도달했습니다. 재연결을 중단합니다.');
        }
    }
}

function onMessageArrived(message: Paho.Message) {
    console.log('토픽 [' + message.destinationName + ']에서 메시지 도착: ' + message.payloadString);
    // 여기에서 받은 메시지로 UI를 업데이트할 수 있습니다.
}

function onMessageDelivered(message: Paho.Message) {
    console.log('토픽 [' + message.destinationName + '] onMessageDelivered에서 메시지 발행 완료: ' + message.payloadString);
}

export function publishMessage(topic: string, payload: string) {
    if (client && isConnected) {
        const message = new Paho.Message(payload);
        message.destinationName = topic;
        client.send(message);
        console.log(`발행됨: "${payload}" to "${topic}"`);
    } else {
        console.log('클라이언트가 연결되지 않았습니다. 발행할 수 없습니다.');
    }
}


const sendButton = document.getElementById('mqtt_send_button');
sendButton.addEventListener('click', () => {
    const topic = document.getElementById('mqtt_send_topic') as HTMLInputElement;
    const message = document.getElementById('mqtt_send_message') as HTMLInputElement;
    publishMessage(topic.value, message.value);
})