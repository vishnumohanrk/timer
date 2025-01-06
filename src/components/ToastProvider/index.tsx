import { Toaster } from 'sonner';
import { useMediaQuery } from '../../hooks/UseMediaQuery';

export function ToastProvider() {
  const isDesktopScreen = useMediaQuery('(min-width: 768px)');

  return <Toaster position={isDesktopScreen ? 'top-right' : 'bottom-center'} />;
}
