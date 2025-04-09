export function connectPatientSocket(onMessage: (data: any) => void) {
    // Ajusta la URL para que coincida con la ruta del backend: ws://localhost:8081/pacientes
    const socket = new WebSocket("ws://54.89.252.220:8081/patients/");
  
    socket.onopen = () => {
      console.log("🟢 WebSocket de pacientes conectado");
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Datos recibidos del WebSocket:", data);
      onMessage(data);
    };
  
    socket.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
    };
  
    socket.onclose = () => {
      console.log("🔴 WebSocket de pacientes desconectado");
    };
  
    return socket;
  }
  