'use client'
import { Eye, EyeOff, Rocket } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const response = await fetch('http://172.16.3.189:8000/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      
      // Set the auth token in a cookie
      document.cookie = `auth_token=${data.access}; path=/; max-age=86400` // 24 hours

      // Redirect to the original page or home
      const returnUrl = searchParams.get('from') || '/'
      router.push(returnUrl)
    } catch (err) {
      console.error('Login error:', err)
      setError("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative bg-white">
      {/* Left side - Blue panel with logo */}
      <div className="hidden md:block md:w-6/12 bg-gradient-to-b from-blue-700 to-blue-500 relative overflow-hidden">
        <div className="relative z-10 p-12 flex flex-col items-center text-white">
          <h1 className="text-2xl font-medium mb-12 self-start">Хуш келибсиз</h1>

          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
              <Rocket className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold">Миллий статистика қўмитаси тузилмаси</h2>
          </div>
          <p className="text-sm opacity-80 max-w-xs text-center">
            Миллий статистика қўмитаси тузилмаси раҳбарияти ва ходимлари ҳақида маълумот
          </p>
        </div>
      </div>

      {/* Enhanced Wave divider for desktop */}
      <div className="absolute top-0 bottom-0 left-[calc(50%-175px)] w-[100px] hidden md:block overflow-hidden">
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: 0 }}
        >
          <path
            d="M100,0 L100,1000 L0,1000 
            C80,750 10,650 50,500 
            C90,350 40,250 80,100 
            C100,50 90,0 100,0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-7/12 md:ml-auto flex items-center justify-center p-8 pt-32 md:pt-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Кириш</h2>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Фойдаланувчи номи
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Фойдаланувчи номини киритинг"
                className="w-full px-0 py-2 border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:ring-0 placeholder-gray-400 outline-none text-[black]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Калит сўз
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Калит сўзни киритинг"
                  className="w-full px-0 py-2 border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:ring-0 placeholder-gray-400 outline-none text-[black] pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Юкланмоқда..." : "Кириш"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile view - Wave header with logo */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-blue-700 to-blue-500 md:hidden">
        <div className="flex items-center justify-center h-16 pt-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
            <Rocket className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-white">Миллий Статистика Қўмитаси Тузилмаси</h2>
        </div>

        {/* Enhanced Mobile wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-16">
            <path d="M0,0 C200,120 400,20 600,100 C800,20 1000,120 1200,40 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}
