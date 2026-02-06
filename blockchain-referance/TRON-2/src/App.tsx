import { WalletProvider } from './components/WalletProvider';
import { ConnectButton } from './components/ConnectButton';
import { useTronProviderDetector } from './hooks/useTronProviderDetector';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletConnect } from './components/WalletConnect';

function DebugPanel() {
  const { isTronLinkAvailable } = useTronProviderDetector();
  const { connected, address, wallet } = useWallet();

  return (
    <div className="mt-8 w-full max-w-2xl bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-mono font-bold text-white">Sistem Durumu (Debug)</h3>
      </div>

      <div className="p-0">
        <table className="w-full text-left text-sm font-mono text-gray-400">
          <tbody className="divide-y divide-gray-700">
            <tr className="bg-gray-900/50">
              <td className="px-6 py-4 font-semibold text-gray-300">Provider Durumu</td>
              <td className="px-6 py-4">
                {isTronLinkAvailable ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                    🟢 Trust/TronLink Enjekte Edildi (In-App)
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                    🟡 Tespit Edilmedi (Mobil Tarayıcı)
                  </span>
                )}
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 font-semibold text-gray-300">Bağlantı Durumu</td>
              <td className="px-6 py-4">
                {connected ? (
                  <span className="text-green-400">BAĞLI</span>
                ) : (
                  <span className="text-red-400">BAĞLI DEĞİL</span>
                )}
              </td>
            </tr>

            <tr className="bg-gray-900/50">
              <td className="px-6 py-4 font-semibold text-gray-300">Cüzdan Adresi</td>
              <td className="px-6 py-4 text-white">
                {address || "---"}
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 font-semibold text-gray-300">Aktif Adaptör</td>
              <td className="px-6 py-4">
                {wallet ? wallet.adapter.name : "Yok"}
              </td>
            </tr>

            <tr className="bg-gray-900/50">
              <td className="px-6 py-4 font-semibold text-gray-300">Tarayıcı Tipi</td>
              <td className="px-6 py-4">
                {typeof window !== 'undefined' && (window as any).tronWeb ? "In-App Browser (TronWeb Global)" : "Standart Tarayıcı"}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="min-h-screen bg-black text-gray-100 p-8 flex flex-col items-center">
      <div className="absolute top-4 right-4 bg-yellow-600/20 text-yellow-500 border border-yellow-600/40 px-3 py-1 rounded text-xs font-mono tracking-widest uppercase">
        Nile Testnet
      </div>
      <h1 className="text-2xl font-bold mb-8 text-white">Tron dApp Mimari Test <span className="text-xs text-gray-500 font-mono font-normal">(Nile)</span></h1>

      <div className="mb-12 w-full flex flex-col items-center gap-8">
        <ConnectButton />
        <WalletConnect />
      </div>

      <DebugPanel />
    </div>
  )
}

function App() {
  return (
    <WalletProvider>
      <MainContent />
    </WalletProvider>
  );
}

export default App;
