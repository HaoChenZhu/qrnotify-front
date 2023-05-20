import { Component, OnInit } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  message: string | undefined;
  constructor(private _mqttService: MqttService) {

  }
  ngOnInit() {
    this._mqttService.observe('test').subscribe((message: IMqttMessage) => {
      console.log('Received message: ', message.payload.toString());
    });
    console.log('Connecting mqtt client')
  }
}






