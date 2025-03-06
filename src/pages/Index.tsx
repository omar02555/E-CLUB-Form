
import JoinForm from "@/components/JoinForm";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-gray-900 text-white p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-club-gold to-amber-300 mb-3">
            Entrepreneurs Club
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Join our innovative community of creators and future leaders
          </p>
        </div>
        
        <JoinForm />
        
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-3">
            <span>© {new Date().getFullYear()} Entrepreneurs Club</span>
            <span className="hidden md:block">•</span>
            <span>New Cairo Technological University</span>
          </div>
          <p>
            Created by <a 
              href="https://omar-abbas.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-club-gold hover:text-amber-300 transition-colors underline"
            >
              Omar Radwan
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
