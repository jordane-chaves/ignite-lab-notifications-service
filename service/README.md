<h1 align="center">Notifications Service</h1>

<p align="center">O Notifications Service é um microsserviço especializado em envio de notificações push.</p>

## 🎲 Como Executar

Execute o servidor kafka com o comando:

```bash
docker-compose up -d
```

Com o servidor online, execute o serviço de notificações

```bash
yarn start:dev
```

> Dessa forma o serviço irá iniciar e se conectar ao servidor kafka para poder consumir as mensagens.
