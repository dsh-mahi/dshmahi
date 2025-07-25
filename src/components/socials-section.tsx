import { Github, Instagram, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import WhatsAppIcon from '@/components/icons/whatsapp-icon';
import ThreadsIcon from '@/components/icons/threads-icon';

const socialLinks = [
  {
    name: 'WhatsApp',
    handle: 'I prefer this',
    href: '#',
    icon: <WhatsAppIcon className="h-8 w-8 text-white" />,
    preferred: true
  },
  {
    name: 'Instagram',
    handle: '@beyourahi',
    href: 'https://instagram.com/beyourahi',
    icon: <Instagram className="h-8 w-8 text-white" />
  },
  {
    name: 'Threads',
    handle: '@beyourahi',
    href: '#',
    icon: <ThreadsIcon className="h-8 w-8 text-white" />
  },
  {
    name: 'GitHub',
    handle: '@beyourahi',
    href: 'https://github.com/beyourahi',
    icon: <Github className="h-8 w-8 text-white" />
  }
];

export default function SocialsSection() {
  return (
    <section id="socials" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-left mb-12">
          <p className="text-sm font-bold uppercase text-muted-foreground mb-2">CONTACT</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Hit me up! (if you're chill)</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            My inbox is open right after my 3rd coffee and emotional breakdown. Slide in, I promise I won't ghost you 👻
          </p>
        </div>
        <hr className="border-accent mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialLinks.map((link, index) => (
            <a href={link.href} key={index} target="_blank" rel="noopener noreferrer">
              <Card className="bg-card/50 backdrop-blur-lg border border-accent/50 hover:border-accent transition-all duration-300 h-48 flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg hover:shadow-primary/10">
                <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-2 border ${link.preferred ? 'border-green-500' : 'border-muted-foreground'}`}>
                    {link.icon}
                  </div>
                  <p className="font-semibold text-foreground">{link.name}</p>
                  <p className={`text-sm ${link.preferred ? 'text-green-500' : 'text-muted-foreground'}`}>{link.handle}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
        <footer className="text-center text-muted-foreground mt-24">
          <p>&copy; {new Date().getFullYear()} Dsh Mahi. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
}