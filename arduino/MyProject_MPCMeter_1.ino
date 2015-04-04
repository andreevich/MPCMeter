int inByte = 0;  

void setup()  {
  pinMode(9, OUTPUT);
  pinMode(3, OUTPUT);
  analogWrite(3, 0);
  analogWrite(9, 0);
  Serial.begin(57600);
}
 
void loop()  {
  Serial.print('A');
  delay(100); 
  
  if (Serial.available() > 0) {
    analogWrite(3, 5);
    inByte = Serial.parseInt();
    analogWrite(9, inByte);
    if (inByte==255)
    analogWrite(3, 255);
  }
}
