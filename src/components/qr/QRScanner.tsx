import { useState } from 'react';
import { X, Camera, Zap, Check, AlertCircle, ScanLine, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import cimedSymbol from '@/assets/cimed-symbol.png';

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
    setTimeout(() => {
      setResult('success');
    }, 1800);
  };

  const handleReset = () => {
    setScanning(true);
    setResult(null);
  };

  const now = new Date();
  const timestamp = now.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const txId = `CG-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-[2000] bg-[hsl(0,0%,4%)]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 safe-top">
        <button onClick={onClose} className="w-10 h-10 bg-[hsl(0,0%,12%)] border-[2px] border-[hsl(0,0%,20%)] flex items-center justify-center">
          <X className="w-5 h-5 text-[hsl(0,0%,90%)]" />
        </button>
        <div className="flex items-center gap-2">
          <ScanLine className="w-4 h-4 text-[hsl(50,100%,50%)]" />
          <span className="text-[hsl(0,0%,90%)] font-black text-xs uppercase tracking-wider">Scanner QR</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* === SCANNING STATE === */}
          {scanning && !result && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex flex-col items-center"
            >
              <div className="w-64 h-64 relative">
                {/* Corner brackets — brutalist squares */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-[4px] border-l-[4px] border-[hsl(50,100%,50%)]" />
                <div className="absolute top-0 right-0 w-10 h-10 border-t-[4px] border-r-[4px] border-[hsl(50,100%,50%)]" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[4px] border-l-[4px] border-[hsl(50,100%,50%)]" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[4px] border-r-[4px] border-[hsl(50,100%,50%)]" />

                {/* Animated scan line */}
                <motion.div
                  className="absolute left-4 right-4 h-[3px] bg-[hsl(50,100%,50%)]"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 12px hsl(50 100% 50% / 0.4)' }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-[hsl(0,0%,30%)]" />
                </div>
              </div>

              <p className="text-[hsl(0,0%,50%)] text-xs text-center mt-6 font-bold uppercase tracking-wider">
                Aponte a câmera para o QR Code
              </p>

              <div className="mt-8">
                <Button
                  onClick={simulateScan}
                  className="h-12 px-8 bg-[hsl(50,100%,50%)] text-[hsl(0,0%,4%)] border-[3px] border-[hsl(0,0%,4%)] shadow-[4px_4px_0_hsl(0,0%,4%)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black text-sm uppercase"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Simular Scan
                </Button>
              </div>
            </motion.div>
          )}

          {/* === PROCESSING STATE === */}
          {!scanning && !result && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-5"
            >
              <motion.div
                className="w-20 h-20 border-[4px] border-[hsl(50,100%,50%)] flex items-center justify-center"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              >
                <ScanLine className="w-8 h-8 text-[hsl(50,100%,50%)]" />
              </motion.div>
              <p className="text-[hsl(0,0%,80%)] font-black text-sm uppercase tracking-wider">Processando...</p>
            </motion.div>
          )}

          {/* === SUCCESS — RECEIPT COMPROVANTE === */}
          {result === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="w-full max-w-sm mx-4"
            >
              {/* Receipt card */}
              <div className="bg-[hsl(0,0%,10%)] border-[3px] border-[hsl(0,0%,22%)] shadow-[6px_6px_0_hsl(0,0%,0%/0.6)] overflow-hidden">
                
                {/* Header band */}
                <div className="bg-[hsl(50,100%,50%)] px-5 py-4 border-b-[3px] border-[hsl(0,0%,4%)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={cimedSymbol} alt="Cimed" className="w-7 h-7" />
                      <span className="font-black text-[hsl(0,0%,4%)] text-sm uppercase tracking-wider">Cimed GO</span>
                    </div>
                    <span className="text-[10px] font-bold text-[hsl(0,0%,4%)/0.6] uppercase">Comprovante</span>
                  </div>
                </div>

                {/* Success icon + points */}
                <div className="flex flex-col items-center pt-8 pb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
                    className="w-[72px] h-[72px] bg-[hsl(142,70%,45%)/0.15] border-[3px] border-[hsl(142,70%,45%)] flex items-center justify-center mb-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 500 }}
                    >
                      <Check className="w-9 h-9 text-[hsl(142,70%,45%)]" strokeWidth={3} />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-black text-3xl text-[hsl(50,100%,50%)] uppercase"
                  >
                    +50 Pontos
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-[hsl(0,0%,55%)] text-xs font-bold mt-1.5 uppercase tracking-wider"
                  >
                    Check-in realizado com sucesso
                  </motion.p>
                </div>

                {/* Dotted separator */}
                <div className="mx-5 border-t-[2px] border-dashed border-[hsl(0,0%,22%)]" />

                {/* Details section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="px-5 py-4 space-y-3"
                >
                  {/* Product */}
                  <div className="flex items-center gap-3 p-3 bg-[hsl(0,0%,7%)] border-[2px] border-[hsl(0,0%,18%)]">
                    <div className="w-10 h-10 bg-[hsl(50,100%,50%)/0.1] border-[2px] border-[hsl(0,0%,22%)] flex items-center justify-center flex-shrink-0">
                      <img src={cimedSymbol} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[hsl(0,0%,90%)] text-sm font-black uppercase">Carmed Fini</p>
                      <p className="text-[hsl(0,0%,45%)] text-[10px] font-bold uppercase">Produto escaneado</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[hsl(50,100%,50%)] flex-shrink-0" />
                    <span className="text-[hsl(0,0%,60%)] text-xs font-bold">Drogasil Paulista</span>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-[hsl(50,100%,50%)] flex-shrink-0" />
                    <span className="text-[hsl(0,0%,60%)] text-xs font-bold">{timestamp}</span>
                  </div>
                </motion.div>

                {/* Dotted separator */}
                <div className="mx-5 border-t-[2px] border-dashed border-[hsl(0,0%,22%)]" />

                {/* Transaction ID */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <span className="text-[hsl(0,0%,40%)] text-[10px] font-bold uppercase tracking-wider">ID Transação</span>
                  <span className="text-[hsl(0,0%,55%)] text-[10px] font-mono font-bold">{txId}</span>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="px-5 pb-5 pt-2 flex gap-3"
                >
                  <button
                    onClick={handleReset}
                    className="flex-1 h-12 flex items-center justify-center gap-2 bg-[hsl(0,0%,14%)] border-[2px] border-[hsl(0,0%,25%)] text-[hsl(0,0%,80%)] font-black text-xs uppercase tracking-wider hover:bg-[hsl(0,0%,18%)] transition-colors"
                  >
                    <ScanLine className="w-4 h-4" />
                    Escanear Outro
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 h-12 flex items-center justify-center gap-2 bg-[hsl(50,100%,50%)] border-[2px] border-[hsl(0,0%,4%)] text-[hsl(0,0%,4%)] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0_hsl(0,0%,4%)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Fechar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* === ERROR STATE === */}
          {result === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-sm mx-4"
            >
              <div className="bg-[hsl(0,0%,10%)] border-[3px] border-[hsl(0,84%,60%)/0.4] shadow-[6px_6px_0_hsl(0,0%,0%/0.6)] p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 border-[3px] border-[hsl(0,84%,60%)] bg-[hsl(0,84%,60%)/0.1] flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-[hsl(0,84%,60%)]" />
                </div>
                <h2 className="text-[hsl(0,0%,90%)] text-xl font-black uppercase">QR Inválido</h2>
                <p className="text-[hsl(0,0%,50%)] text-sm mt-2 font-bold">Este QR code não é válido ou já expirou.</p>
                <button
                  onClick={handleReset}
                  className="mt-6 h-12 px-8 bg-[hsl(50,100%,50%)] text-[hsl(0,0%,4%)] border-[3px] border-[hsl(0,0%,4%)] shadow-[4px_4px_0_hsl(0,0%,4%)] font-black text-sm uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Tentar novamente
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QRScanner;
