import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Heart, Award, ArrowUp, Sparkles, Clock, Bell } from 'lucide-react';

// Mock feed data
const feedItems = [
  {
    id: 1,
    type: 'announcement',
    pinned: true,
    author: {
      name: 'CodePulse Team',
      username: 'codepulse_admin',
      avatar: '',
      role: 'Admin'
    },
    content: 'New Machine Learning course coming next week! Get ready to dive into the world of AI and neural networks.',
    timestamp: '2 hours ago',
    likes: 42,
    comments: 7,
  },
  {
    id: 2,
    type: 'achievement',
    pinned: false,
    author: {
      name: 'Jean Uwimana',
      username: 'jean_code',
      avatar: '',
    },
    content: 'Just completed the Next.js Certification Exam with a score of 95%! The routing challenges were quite interesting.',
    achievement: 'Next.js Certified Developer',
    timestamp: '5 hours ago',
    likes: 34,
    comments: 12,
  },
  {
    id: 3,
    type: 'announcement',
    pinned: true,
    author: {
      name: 'CodePulse Team',
      username: 'codepulse_admin',
      avatar: '',
      role: 'Admin'
    },
    content: 'We\'ve updated our HTML/CSS track with 5 new challenges focusing on CSS Grid and Flexbox. Check it out!',
    timestamp: '1 day ago',
    likes: 28,
    comments: 4,
  },
  {
    id: 4,
    type: 'tip',
    pinned: false,
    author: {
      name: 'Eric Kagame',
      username: 'eric_dev',
      avatar: '',
      role: 'Mentor'
    },
    content: 'Pro Tip: When learning JavaScript, focus on understanding closures and how the this keyword works. These concepts are fundamental to becoming a strong JS developer.',
    timestamp: '1 day ago',
    likes: 56,
    comments: 8,
  },
  {
    id: 5,
    type: 'achievement',
    pinned: false,
    author: {
      name: 'Marie Ishimwe',
      username: 'marie_ishimwe',
      avatar: '',
    },
    content: 'Just built my first full-stack app using React and Firebase! Check out my portfolio to see it in action.',
    achievement: 'First Full-Stack Project',
    timestamp: '2 days ago',
    likes: 45,
    comments: 11,
  },
  {
    id: 6,
    type: 'tip',
    pinned: false,
    author: {
      name: 'David Ndahiro',
      username: 'david_codes',
      avatar: '',
      role: 'Mentor'
    },
    content: 'Remember to keep your CSS selectors as simple as possible. Overspecificity can lead to maintenance nightmares as your project grows.',
    timestamp: '3 days ago',
    likes: 32,
    comments: 6,
  },
];

const Feed = () => {
  const { isKidsMode } = useTheme();
  
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl font-bold ${isKidsMode ? 'text-kids-primary' : ''}`}>
          Activity Feed
        </h1>
        <Button variant={isKidsMode ? "default" : "outline"} className={isKidsMode ? "kids-button" : ""}>
          <Bell className="mr-2" /> Notifications
        </Button>
      </div>
      
      <Tabs defaultValue="all" className={`w-full ${isKidsMode ? 'kids-card p-2' : ''}`}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {/* Post creator card */}
          <Card className={isKidsMode ? 'kids-card' : 'glass-card'}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className={`h-10 w-10 ${isKidsMode ? 'border-2 border-kids-primary' : ''}`}>
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-secondary/40 rounded-2xl px-4 py-3 cursor-pointer hover:bg-secondary/60 transition-colors">
                  <p className="text-muted-foreground">Share something with the community...</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex gap-2 justify-end">
              <Button variant="outline" size="sm" className="gap-2">
                <Award size={16} /> Achievement
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles size={16} /> Tip
              </Button>
              <Button size="sm" className={isKidsMode ? "kids-button" : ""}>Post</Button>
            </CardFooter>
          </Card>
          
          {/* Feed items */}
          {feedItems.map(item => (
            <Card 
              key={item.id} 
              className={`
                ${isKidsMode ? 'kids-card' : 'glass-card'}
                ${item.pinned ? (isKidsMode ? 'border-kids-primary border-4' : 'border-l-4 border-l-black dark:border-l-white') : ''}
              `}
            >
              {item.pinned && (
                <div className={`
                  px-4 py-1 text-xs font-medium flex items-center gap-1
                  ${isKidsMode ? 'bg-kids-secondary text-kids-foreground' : 'bg-black text-white dark:bg-white dark:text-black'}
                `}>
                  <ArrowUp size={12} />
                  {isKidsMode ? 'Important Message!' : 'Pinned Post'}
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <Avatar className={isKidsMode ? 'border-2 border-kids-primary' : ''}>
                    <AvatarImage src={item.author.avatar} />
                    <AvatarFallback>{item.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.author.name}</span>
                      <span className="text-muted-foreground text-sm">@{item.author.username}</span>
                      {item.author.role && (
                        <span className={`
                          text-xs px-2 py-0.5 rounded-full
                          ${item.author.role === 'Admin' 
                            ? (isKidsMode ? 'bg-kids-primary text-white' : 'bg-black text-white dark:bg-white dark:text-black')
                            : (isKidsMode ? 'bg-kids-secondary text-kids-foreground' : 'bg-secondary text-secondary-foreground')
                          }
                        `}>
                          {item.author.role}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                  {item.content}
                </p>
                
                {item.achievement && (
                  <div className={`
                    mt-3 px-4 py-2 rounded-lg flex items-center gap-2
                    ${isKidsMode 
                      ? 'bg-kids-secondary' 
                      : 'bg-secondary/60'
                    }
                  `}>
                    <Award className={isKidsMode ? 'text-kids-primary' : ''} />
                    <span className={`font-medium ${isKidsMode ? 'text-kids-foreground' : ''}`}>
                      Earned: {item.achievement}
                    </span>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className={`
                border-t flex gap-4 text-muted-foreground text-sm
                ${isKidsMode ? 'border-kids-muted' : 'border-border'}
              `}>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Heart size={16} />
                  <span>{item.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <MessageSquare size={16} />
                  <span>{item.comments}</span>
                </button>
                
                {item.type === 'tip' && (
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link to="/courses">Try it now</Link>
                  </Button>
                )}
                
                {item.type === 'announcement' && (
                  <Button 
                    variant={isKidsMode ? "default" : "outline"} 
                    size="sm" 
                    className={`ml-auto ${isKidsMode ? 'kids-button' : ''}`}
                  >
                    Learn more
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="announcements" className="space-y-4">
          {feedItems.filter(item => item.type === 'announcement').map(item => (
            <Card 
              key={item.id} 
              className={`
                ${isKidsMode ? 'kids-card' : 'glass-card'}
                ${item.pinned ? (isKidsMode ? 'border-kids-primary border-4' : 'border-l-4 border-l-black dark:border-l-white') : ''}
              `}
            >
              {item.pinned && (
                <div className={`
                  px-4 py-1 text-xs font-medium flex items-center gap-1
                  ${isKidsMode ? 'bg-kids-secondary text-kids-foreground' : 'bg-black text-white dark:bg-white dark:text-black'}
                `}>
                  <ArrowUp size={12} />
                  {isKidsMode ? 'Important Message!' : 'Pinned Post'}
                </div>
              )}
              
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <Avatar className={isKidsMode ? 'border-2 border-kids-primary' : ''}>
                    <AvatarImage src={item.author.avatar} />
                    <AvatarFallback>{item.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.author.name}</span>
                      <span className="text-muted-foreground text-sm">@{item.author.username}</span>
                      {item.author.role && (
                        <span className={`
                          text-xs px-2 py-0.5 rounded-full
                          ${item.author.role === 'Admin' 
                            ? (isKidsMode ? 'bg-kids-primary text-white' : 'bg-black text-white dark:bg-white dark:text-black')
                            : (isKidsMode ? 'bg-kids-secondary text-kids-foreground' : 'bg-secondary text-secondary-foreground')
                          }
                        `}>
                          {item.author.role}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                  {item.content}
                </p>
              </CardContent>
              
              <CardFooter className={`
                border-t flex gap-4 text-muted-foreground text-sm
                ${isKidsMode ? 'border-kids-muted' : 'border-border'}
              `}>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Heart size={16} />
                  <span>{item.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <MessageSquare size={16} />
                  <span>{item.comments}</span>
                </button>
                
                <Button 
                  variant={isKidsMode ? "default" : "outline"} 
                  size="sm" 
                  className={`ml-auto ${isKidsMode ? 'kids-button' : ''}`}
                >
                  Learn more
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          {feedItems.filter(item => item.type === 'achievement').map(item => (
            <Card key={item.id} className={isKidsMode ? 'kids-card' : 'glass-card'}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <Avatar className={isKidsMode ? 'border-2 border-kids-primary' : ''}>
                    <AvatarImage src={item.author.avatar} />
                    <AvatarFallback>{item.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.author.name}</span>
                      <span className="text-muted-foreground text-sm">@{item.author.username}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                  {item.content}
                </p>
                
                <div className={`
                  mt-3 px-4 py-2 rounded-lg flex items-center gap-2
                  ${isKidsMode 
                    ? 'bg-kids-secondary' 
                    : 'bg-secondary/60'
                  }
                `}>
                  <Award className={isKidsMode ? 'text-kids-primary' : ''} />
                  <span className={`font-medium ${isKidsMode ? 'text-kids-foreground' : ''}`}>
                    Earned: {item.achievement}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className={`
                border-t flex gap-4 text-muted-foreground text-sm
                ${isKidsMode ? 'border-kids-muted' : 'border-border'}
              `}>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Heart size={16} />
                  <span>{item.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <MessageSquare size={16} />
                  <span>{item.comments}</span>
                </button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="tips" className="space-y-4">
          {feedItems.filter(item => item.type === 'tip').map(item => (
            <Card key={item.id} className={isKidsMode ? 'kids-card' : 'glass-card'}>
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <Avatar className={isKidsMode ? 'border-2 border-kids-primary' : ''}>
                    <AvatarImage src={item.author.avatar} />
                    <AvatarFallback>{item.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.author.name}</span>
                      <span className="text-muted-foreground text-sm">@{item.author.username}</span>
                      {item.author.role && (
                        <span className={`
                          text-xs px-2 py-0.5 rounded-full
                          ${isKidsMode ? 'bg-kids-secondary text-kids-foreground' : 'bg-secondary text-secondary-foreground'}
                        `}>
                          {item.author.role}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className={isKidsMode ? 'text-kids-foreground text-lg' : ''}>
                  {item.content}
                </p>
              </CardContent>
              
              <CardFooter className={`
                border-t flex gap-4 text-muted-foreground text-sm
                ${isKidsMode ? 'border-kids-muted' : 'border-border'}
              `}>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Heart size={16} />
                  <span>{item.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <MessageSquare size={16} />
                  <span>{item.comments}</span>
                </button>
                
                <Button variant="outline" size="sm" className="ml-auto" asChild>
                  <Link to="/courses">Try it now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feed;
