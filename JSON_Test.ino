#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

const char* ssid = "safa";
const char* password = "masud123";

const int ledPin = 32; // the pin that the LED is connected to
const int ledSensor = 34; //light sensor pin
const int acPin = 33; // the pin that the ac is connected to
const int acDustPin = 35; // pin to connect dust sensor

AsyncWebServer server(80);

void setup() {
  pinMode(acPin, OUTPUT);
  pinMode(acDustPin, INPUT);
  
  pinMode(ledPin, OUTPUT);
  pinMode(ledSensor, INPUT);
  
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "Hello from ESP32!");
  });

  server.on("/light/off", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(ledPin, LOW);
    request->send(200, "text/plain", "Light turned off");
  });

  server.on("/light/on", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(ledPin, HIGH);
    request->send(200, "text/plain", "Light turned on");
  });

server.on("/ac/off", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(acPin, LOW);
    request->send(200, "text/plain", "AC turned off");
  });

  server.on("/ac/on", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(acPin, HIGH);
    request->send(200, "text/plain", "AC turned on");
  });
  server.on("/dust", HTTP_GET, [](AsyncWebServerRequest *request){
    StaticJsonDocument<200> doc;
    int status = digitalRead(acDustPin);
    doc["pin"] = acDustPin;
    doc["status"] = status;

    String output;
    serializeJson(doc, output);

    request->send(200, "application/json", output);
  });

  server.on("/ledSense", HTTP_GET, [](AsyncWebServerRequest *request){
    StaticJsonDocument<200> doc;
    int status = digitalRead(ledSensor);
    doc["pin"] = ledSensor;
    doc["status"] = status;

    String output;
    serializeJson(doc, output);

    request->send(200, "application/json", output);
  });

  server.begin();
}

void loop() {
}
