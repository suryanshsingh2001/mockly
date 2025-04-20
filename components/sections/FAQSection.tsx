'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { faqs } from "@/lib/constants"
import { motion } from "framer-motion"
import { BackgroundGradient } from "../layout/background-gradient"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32">
      {/* Custom background with diagonal grid pattern */}
      <BackgroundGradient 
        primaryColor="blue-600" 
        secondaryColor="indigo-500" 
        accentColor="violet-400"
        gridOpacity="0.05"
        className="z-0"
      />
      
    
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Frequently Asked <span className="text-primary ">Questions</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
              Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to reach out.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid gap-4 md:gap-6"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-blue-600/10 hover:border-blue-600/20 transition-all">
                <CardContent className="p-0">
                  <button
                    className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="text-base sm:text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-200 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
      
      </div>
    </section>
  )
}