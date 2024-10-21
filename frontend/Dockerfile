# Usar a imagem oficial do Node como base
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Instalar as dependências do Angular globalmente
RUN npm install -g @angular/cli

# Copiar o arquivo package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Desativar o envio de dados analíticos do Angular
ENV NG_CLI_ANALYTICS="false"

# Expor a porta que o Angular usa
EXPOSE 4200

# Comando padrão para rodar o Angular no modo desenvolvimento
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
