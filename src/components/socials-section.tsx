import { Github, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import WhatsAppIcon from '@/components/icons/whatsapp-icon';


const socialLinks = [
  {
    name: 'WhatsApp',
    handle: 'For a quick chat',
    href: '#',
    icon: <WhatsAppIcon className="h-8 w-8 text-white" />,
    preferred: true
  },
  {
    name: 'Instagram',
    handle: 'The highlight reel',
    href: '#',
    icon: <Instagram className="h-8 w-8 text-white" />
  },
  {
    name: 'LinkedIn',
    handle: 'The professional side',
    href: '#',
    icon: <Linkedin className="h-8 w-8 text-white" />
  },
  {
    name: 'GitHub',
    handle: 'Where the code lives',
    href: '#',
    icon: <Github className="h-8 w-8 text-white" />
  }
];

export default function SocialsSection() {
  return (
    <section id="socials" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-left mb-12">
          <p className="text-sm font-bold uppercase text-muted-foreground mb-2">Connect</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Create Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            My digital door is always open. Whether you have a question, a project, or just want to geek out about code, I'm here for it.
          </p>
        </div>
        <hr className="border-accent mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialLinks.map((link, index) => (
            <a href={link.href} key={index} target="_blank" rel="noopener noreferrer" className="pointer-events-none">
              <Card className="bg-background/50 backdrop-blur-sm border border-accent hover:border-accent transition-all duration-300 h-48 flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-lg hover:shadow-primary/10">
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
      </div>
    </section>
  );
}
