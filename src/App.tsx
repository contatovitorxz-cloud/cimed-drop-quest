import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Challenges from "./pages/Challenges";
import Missions from "./pages/Missions";
import Drops from "./pages/Drops";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Social from "./pages/Social";
import ScanHistory from "./pages/ScanHistory";
import Analytics from "./pages/Analytics";
import InfluencerRegister from "./pages/InfluencerRegister";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import InfluencerProfile from "./pages/InfluencerProfile";
import AdminDashboard from "./pages/AdminDashboard";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/social" element={<Social />} />
            <Route path="/scan-history" element={<ScanHistory />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/influencer" element={<InfluencerRegister />} />
            <Route path="/influencer-dashboard" element={<InfluencerDashboard />} />
            <Route path="/influencer-profile" element={<InfluencerProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
