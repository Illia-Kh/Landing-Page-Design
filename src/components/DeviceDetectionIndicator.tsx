import { useMobileDevice } from "./ui/use-mobile-device";

export function DeviceDetectionIndicator() {
  const isMobileDevice = useMobileDevice();

  // Показываем индикатор только в режиме разработки
  if (process.env['NODE_ENV'] === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border border-border rounded-lg p-3 shadow-lg">
      <div className="text-xs space-y-1">
        <div className="font-semibold">Детекция устройства:</div>
        <div className={`px-2 py-1 rounded text-xs ${
          isMobileDevice 
            ? 'bg-destructive text-destructive-foreground' 
            : 'bg-primary text-primary-foreground'
        }`}>
          {isMobileDevice ? 'CodeLogo скрыт' : 'CodeLogo показан'}
        </div>
        <div className="text-muted-foreground">
          Ширина: {typeof window !== 'undefined' ? window.innerWidth : 0}px
        </div>
      </div>
    </div>
  );
}
