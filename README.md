## Getting started
Для запуска gui и js-сервера необходим node.js v20:
```bash
cd backend
npm install
npm start
```
```bash
cd frontend
npm install
npm start
```

Рекомендуемые требования для запуска ML-компонента:
CPU 4 ядра
Память 32 ГБ
GPU 1 × Tesla T4  16 ГБ 
Жесткий диск SSD 100гб
Для разработки и тестирования использовалась виртуальная машина Ubuntu 22.04 LTS Machine Learning 64-bit DSVM
https://selectel.ru/services/cloud/dsvm/

Для запуска ML-компонента необходим nvidia cuda 11.8 версии или выше и python3.10 
```bash
cd mlserver
python3.10 install -r requirements.txt
python3.10 server.py
```
