import { useState, useEffect } from "react";
import axios from "axios";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [period, setPeriod] = useState(""); // Período do filtro
  const [searchContent, setSearchContent] = useState(""); // Conteúdo de pesquisa

  useEffect(() => {
    // Função para obter os logs da API
    const fetchLogs = async () => {
      try {
        const apiUrl = "http://localhost:3000/api/logs";
        const response = await axios.get(apiUrl);
        setLogs(response.data);
        setFilteredLogs(response.data);
      } catch (error) {
        console.error("Erro ao obter os logs:", error);
      }
    };

    // Chama a função para obter os logs quando o componente é montado
    fetchLogs();
  }, []);

  useEffect(() => {
    // Função para filtrar os logs com base nos filtros
    const applyFilters = () => {
      let filtered = logs;

      // Filtra por período
      if (period) {
        const [startDate, endDate] = period.split(" to ");
        filtered = filtered.filter((log) => {
          const logDate = new Date(log.date);
          return logDate >= new Date(startDate) && logDate <= new Date(endDate);
        });
      }

      // Filtra por conteúdo
      if (searchContent) {
        filtered = filtered.filter((log) =>
          log.message.toLowerCase().includes(searchContent.toLowerCase())
        );
      }

      // Atualiza o estado com os logs filtrados
      setFilteredLogs(filtered);
    };

    // Chama a função para aplicar os filtros quando os estados de filtro mudam
    applyFilters();
  }, [logs, period, searchContent]);

  return (
    <div>
      <h1>Logs</h1>
      <div>
        <label htmlFor="period">Filtrar por Período:</label>
        <input
          type="text"
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Formato: YYYY-MM-DD to YYYY-MM-DD"
        />
      </div>
      <div>
        <label htmlFor="searchContent">Pesquisar Conteúdo:</label>
        <input
          type="text"
          id="searchContent"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          placeholder="Conteúdo da mensagem"
        />
      </div>
      <ul>
        {filteredLogs.map((log) => (
          <li key={log._id}>
            <strong>Data:</strong> {log.date} - <strong>Mensagem:</strong>{" "}
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
