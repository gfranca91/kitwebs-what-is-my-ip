"use client";

import { useState, useEffect } from "react";

interface IPData {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
}

export default function Home() {
  const [data, setData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=060dd316729ae2")
      .then((response) => response.json())
      .then((ipData: IPData) => {
        setData(ipData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Falha ao buscar dados de IP:", err);
        setError("Não foi possível obter os dados de IP.");
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    if (data?.ip) {
      navigator.clipboard.writeText(data.ip).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  // 7. Construindo a Interface
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Qual é o Meu IP?</h1>

        {loading && (
          <p className="text-center text-gray-400">Verificando seus dados...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {data && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-900 rounded-lg flex items-center justify-between">
              <span className="text-xl md:text-2xl font-mono break-all">
                {data.ip}
              </span>
              <button
                onClick={handleCopy}
                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {copySuccess ? "Copiado!" : "Copiar"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-400">Localização</p>
                <p className="font-semibold">
                  {data.city}, {data.country}
                </p>
              </div>
              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-400">Provedor (ISP)</p>
                <p className="font-semibold">{data.org}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
