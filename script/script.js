document
.getElementById("scan-form")
.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const formData = new FormData();
  const fileInput = document.getElementById("file");
  const urlInput = document.getElementById("url");


  if (fileInput.files.length > 0) {
    
    formData.append("file", fileInput.files[0]);
  } else if (urlInput.value) {
    
    formData.append("url", urlInput.value);
  } else {
    document.getElementById("result").textContent =
      "Por favor, selecione um arquivo ou forneça uma URL.";
    return;
  }

  
  fetch("http://127.0.0.1:5000/scan", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta da API:", JSON.stringify(data, null, 2));

      
      if (data.data && data.data.id) {
        const analysisId = data.data.id;
        console.log("ID da análise obtido:", analysisId);

        
        const checkAnalysisStatus = () => {
          fetch(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            {
              method: "GET",
              headers: {
                "x-apikey":
                  "ab894ff132dcdd904200f69439fd3834311e512943dfdd1c19968ada02f59836", 
              },
            }
          )
            .then((analysisResponse) => analysisResponse.json())
            .then((analysisData) => {
              console.log(
                "Resposta da consulta de análise:",
                JSON.stringify(analysisData, null, 2)
              );

              
              if (analysisData.data && analysisData.data.attributes) {
                const status = analysisData.data.attributes.status;
                console.log("Status da análise:", status);

                if (status === "completed") {
                  
                  const stats =
                    analysisData.data.attributes.last_analysis_stats;
                  console.log("Estatísticas da análise:", stats);

                  if (stats) {
                    const safe = stats.safe || 0; 
                    const malicious = stats.malicious || 0; 

                    let resultText = "";

                    if (malicious > 0) {
                      resultText =
                        "Não Seguro (Detectado como malicioso)";
                    } else if (safe > 0) {
                      resultText = "Seguro";
                    } else {
                      resultText = "Análise inconclusiva";
                    }

                    document.getElementById(
                      "result"
                    ).textContent = `Resultado: ${resultText}`;
                  } else {
                    document.getElementById("result").textContent =
                      "Erro: Dados de análise não encontrados.";
                  }
                } else {
                  
                  setTimeout(checkAnalysisStatus, 5000); 
                  document.getElementById("result").textContent =
                    "Análise ainda em processamento... Aguarde.";
                }
              } else {
                console.error(
                  "Erro ao obter os dados da análise:",
                  analysisData
                );
                document.getElementById("result").textContent =
                  "Erro ao acessar a análise. Tente novamente mais tarde.";
              }
            })
            .catch((error) => {
              console.error("Erro na consulta à análise:", error);
              document.getElementById("result").textContent =
                "Erro ao buscar os detalhes da análise: " +
                error.message;
            });
        };

        
        checkAnalysisStatus();
      } else {
        document.getElementById("result").textContent =
          "Erro: ID da análise não encontrado na resposta.";
      }
    })
    .catch((error) => {
      console.error("Erro ao enviar para o servidor:", error);
      document.getElementById("result").textContent =
        "Erro ao enviar para o servidor: " + error.message;
    });
});