# 🛡️ VirusTotal API Integration  

Este projeto integra a API do **VirusTotal** em um site, permitindo a análise de arquivos e URLs para identificar possíveis ameaças. A integração fornece um relatório detalhado de segurança, ajudando usuários a verificarem a confiabilidade de arquivos e links antes de usá-los.  

## 🚀 Funcionalidades  
✅ Upload de arquivos para análise de malware  
✅ Verificação de URLs suspeitas  
✅ Exibição de relatórios de ameaças detectadas  

# 🛡️ VirusTotal API Integration - Tutorial

Este tutorial irá guiá-lo na configuração e utilização do projeto **VirusTotal API Integration**, que permite analisar arquivos e URLs para identificar possíveis ameaças.

---

## 📌 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Python 3.8 ou superior
- Um editor de código (VS Code, PyCharm, etc.)
- Uma conta na **VirusTotal** para obter uma chave de API

---

## ⚙ Instalação

1. **Clone o repositório** (caso ainda não tenha o código-fonte):
   ```bash
   git clone https://github.com/seu-usuario/virustotal-api-integration.git
   cd virustotal-api-integration
   ```

2. **Criação do ambiente virtual (opcional, mas recomendado):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Para Linux/macOS
   venv\Scripts\activate  # Para Windows
   ```

3. **Instale as dependências necessárias:**
   ```bash
   pip install flask flask-cors requests
   ```

---

## 🔑 Configuração da API do VirusTotal

1. Acesse o site do **VirusTotal** ([https://www.virustotal.com/](https://www.virustotal.com/)) e faça login.
2. Vá para **API Key** nas configurações da conta.
3. Copie sua chave de API e cole no arquivo "app.py"
4. Crie um arquivo `.env` no diretório do projeto e adicione:
   ```env
   VIRUSTOTAL_API_KEY=coloque_sua_api_aqui
   ```

---

## 🚀 Como usar?

1. **Inicie o servidor Flask:**
   ```bash
   python app.py
   ```

2. **Acesse a aplicação pelo IDE:**
   - Abra o terminal:
     ```bash
     cd script
     ```
   - Após isso:
     ```bash
     python app.py
     ```
   -Aguarde, e o resultado será esse:
   ![image](https://github.com/user-attachments/assets/c02c27d1-8294-4174-b7df-bb125945f920)

3. **Após isso, abra a página "index.html" e aproveite :)**
---

### 📌 Notas adicionais

Se precisar instalar as dependências novamente, utilize:
```bash
pip install flask flask-cors requests
```
E para iniciar o projeto, execute:
```bash
python app.py
```

