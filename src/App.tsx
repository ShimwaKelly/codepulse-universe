
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AITool from "@/components/AITool";

// Pages
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"; // New login page
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import SingleCourse from "./pages/SingleCourse";
import PracticalCourse from "./pages/PracticalCourse";
import Challenge from "./pages/Challenge";
import FinalExam from "./pages/FinalExam";
import Feed from "./pages/Feed";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<SingleCourse />} />
                <Route path="/courses/:id/module/:moduleId" element={<PracticalCourse />} />
                <Route path="/courses/:id/challenge/:challengeId" element={<Challenge />} />
                <Route path="/courses/:id/exam" element={<FinalExam />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <AITool />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
