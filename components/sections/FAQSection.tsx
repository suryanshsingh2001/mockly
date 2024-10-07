'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { faqs } from "@/lib/constants"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to reach out.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-card text-card-foreground">
              <CardContent className="p-0">
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-base sm:text-lg font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
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
          ))}
        </div>
      </div>
    </section>
  )
}