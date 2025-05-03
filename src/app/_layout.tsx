// app/layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/auth_context';
import { MapProvider } from '../contexts/map_context';

function LayoutContent() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (

    <Stack>
      {user ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="screens/login_screen" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <MapProvider>
        <LayoutContent />
      </MapProvider>
    </AuthProvider>
  );
}
