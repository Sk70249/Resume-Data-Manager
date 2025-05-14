import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function LoginPage() {
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'guest@resumehandler.com',
          password: 'guest123'
        });

        if (error) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: 'guest@resumehandler.com',
            password: 'guest123'
          });

          if (signUpError) {
            console.error('Error creating guest account:', signUpError.message);
          }
        }
      } catch (error) {
        console.error('Error during auto-login:', error);
      }
    };

    autoLogin();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-[#0E1117] rounded-2xl">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl">
            <FileText className="w-8 h-8" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Resume Handler</h1>
          <p className="text-gray-400">Loading your workspace...</p>
        </div>
      </div>
    </div>
  );
}