import { useState } from 'react';
import { X, Camera, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRScannerProps {
  open: boolean;
  onClose: () => void;
}

const QRScanner = ({ open, onClose }: QRScannerProps) => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  if (!open) return null;

  const simulateScan = () => {
    setScanning(false);
    // Simulate a successful scan
    setTimeout(() => {
      setResult('success');
    }, 1500);
  };

  const handleReset = () => {
    setScanning(true);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 safe-top">
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </button>
        <span className="text-white font-bold text-sm">Escanear QR Code</span>
        <div className="w-10" />
      </div>

      {/* Camera view (simulated) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {scanning && !result && (
          <div className="relative">
            {/* Scan frame */}
            <div className="w-64 h-64 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-xl" />

              {/* Animated scan line */}
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-[scan-line_2s_ease-in-out_infinite]" 
                style={{ animation: 'scan-line 2s ease-in-out infinite' }} />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white/30" />
              </div>
            </div>

            <p className="text-white/60 text-xs text-center mt-6">Aponte a câmera para o QR Code</p>

            {/* Simulate scan button */}
            <div className="mt-8 flex justify-center">
              <Button onClick={simulateScan} className="gradient-orange border-0 rounded-xl font-bold">
                <Zap className="w-4 h-4 mr-2" />
                Simular Scan
              </Button>
            </div>
          </div>
        )}

        {!scanning && !result && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-accent" />
            </div>
            <p className="text-white font-bold">Processando...</p>
          </div>
        )}

        {result === 'success' && (
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-bounce-in">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-white text-xl font-black">+50 Pontos!</h2>
            <p className="text-white/60 text-sm">Check-in realizado com sucesso na Drogasil Paulista</p>

            <div className="w-full mt-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍬</span>
                <div className="text-left">
                  <p className="text-white text-sm font-bold">Carmed Fini</p>
                  <p className="text-white/50 text-xs">Produto escaneado</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 w-full">
              <Button onClick={handleReset} variant="outline" className="flex-1 rounded-xl border-white/20 text-white hover:bg-white/10">
                Escanear outro
              </Button>
              <Button onClick={onClose} className="flex-1 gradient-orange border-0 rounded-xl font-bold">
                Fechar
              </Button>
            </div>
          </div>
        )}

        {result === 'error' && (
          <div className="flex flex-col items-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-white text-xl font-black">QR Inválido</h2>
            <p className="text-white/60 text-sm">Este QR code não é válido ou já expirou.</p>
            <Button onClick={handleReset} className="gradient-orange border-0 rounded-xl font-bold mt-4">
              Tentar novamente
            </Button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan-line {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 2px); }
        }
      `}</style>
    </div>
  );
};

export default QRScanner;
