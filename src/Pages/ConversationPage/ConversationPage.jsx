import { useState, useRef, useEffect } from 'react';
import { Search, MoreHorizontal, Send, MapPin, Star, Camera, Palette, Code, Music, Utensils, Briefcase, Heart, Laptop, Archive, BellOff, Trash2, Menu, X } from 'lucide-react';

export default function ConversationPage() {
  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      preview: 'Hi...need wedding photographer for June',
      time: '2m',
      starred: false,
      lastSeen: 'Just now',
      localTime: 'Local time Sep 10, 9:08 AM',
      avatar: 'SJ',
      business: {
        name: 'Wedding Photography',
        location: 'Overland Park, KS',
        icon: <Camera className="w-4 h-4" />,
        type: 'Photography'
      },
      messages: [
        {
          id: 1,
          type: 'incoming',
          text: 'Hi, are you available for multiple project? I need brand identity for my new business as well as a logo and a website',
          time: '9:05 AM',
          showBusiness: true
        },
        {
          id: 2,
          type: 'outgoing',
          text: 'Hi Sarah! Yes, I\'d love to help you with your wedding photography branding. I can definitely handle the complete brand identity, logo design, and website development.',
          time: '9:06 AM'
        },
        {
          id: 3,
          type: 'incoming',
          text: 'That sounds perfect! What\'s your timeline like? I\'m hoping to launch everything by November for the wedding season.',
          time: '9:07 AM'
        },
        {
          id: 4,
          type: 'outgoing',
          text: 'November is definitely achievable. I can have the brand identity and logo completed within 2-3 weeks, and the website ready within 4-6 weeks. Would you like to discuss your vision and requirements?',
          time: '9:08 AM'
        }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      preview: 'The logo concepts look amazing! Can we...',
      time: '1h',
      starred: true,
      lastSeen: '45 minutes ago',
      localTime: 'Local time Sep 10, 8:23 AM',
      avatar: 'MC',
      business: {
        name: 'Tech Startup',
        location: 'San Francisco, CA',
        icon: <Laptop className="w-4 h-4" />,
        type: 'Technology'
      },
      messages: [
        {
          id: 1,
          type: 'outgoing',
          text: 'Hi Mike! I\'ve finished the initial logo concepts for your tech startup. Would you like to review them?',
          time: '8:15 AM'
        },
        {
          id: 2,
          type: 'incoming',
          text: 'The logo concepts look amazing! Can we schedule a call to discuss the final touches?',
          time: '8:20 AM'
        },
        {
          id: 3,
          type: 'outgoing',
          text: 'Absolutely! I\'m free this afternoon or tomorrow morning. What works better for you?',
          time: '8:22 AM'
        },
        {
          id: 4,
          type: 'incoming',
          text: 'Tomorrow morning would be perfect. How about 10 AM PST?',
          time: '8:23 AM'
        }
      ]
    },
    {
      id: 3,
      name: 'Emma Davis',
      preview: 'Thanks for the website mockups...',
      time: '3h',
      starred: false,
      lastSeen: '2 hours ago',
      localTime: 'Local time Sep 10, 6:08 AM',
      avatar: 'ED',
      business: {
        name: 'Art Gallery',
        location: 'New York, NY',
        icon: <Palette className="w-4 h-4" />,
        type: 'Art'
      },
      messages: [
        {
          id: 1,
          type: 'incoming',
          text: 'Thanks for the website mockups. The gallery section looks exactly what I envisioned!',
          time: '6:05 AM'
        },
        {
          id: 2,
          type: 'outgoing',
          text: 'I\'m so glad you love it! The interactive gallery will really showcase your artwork beautifully.',
          time: '6:06 AM'
        },
        {
          id: 3,
          type: 'incoming',
          text: 'When can we start the development phase? I\'m excited to see it come to life.',
          time: '6:08 AM'
        }
      ]
    },
    {
      id: 4,
      name: 'David Rodriguez',
      preview: 'Can you help with restaurant branding?',
      time: '1d',
      starred: false,
      lastSeen: 'Yesterday',
      localTime: 'Local time Sep 9, 7:30 PM',
      avatar: 'DR',
      business: {
        name: 'Mexican Restaurant',
        location: 'Austin, TX',
        icon: <Utensils className="w-4 h-4" />,
        type: 'Restaurant'
      },
      messages: [
        {
          id: 1,
          type: 'incoming',
          text: 'Hi! I saw your portfolio online. Can you help with restaurant branding? We\'re opening a new Mexican restaurant.',
          time: '7:25 PM'
        },
        {
          id: 2,
          type: 'outgoing',
          text: 'Hello David! I\'d love to help with your restaurant branding. I have experience with restaurant identity design and would be excited to work on this project.',
          time: '7:28 PM'
        },
        {
          id: 3,
          type: 'incoming',
          text: 'Perfect! We need everything - logo, menu design, signage, and maybe a simple website. What would be your approach?',
          time: '7:30 PM'
        }
      ]
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      preview: 'The music festival branding is perfect!',
      time: '1d',
      starred: true,
      lastSeen: 'Yesterday',
      localTime: 'Local time Sep 9, 4:15 PM',
      avatar: 'LT',
      business: {
        name: 'Music Festival',
        location: 'Nashville, TN',
        icon: <Music className="w-4 h-4" />,
        type: 'Event'
      },
      messages: [
        {
          id: 1,
          type: 'incoming',
          text: 'The music festival branding is perfect! The vibrant colors really capture the energy we wanted.',
          time: '4:10 PM'
        },
        {
          id: 2,
          type: 'outgoing',
          text: 'Thank you Lisa! I wanted to create something that would stand out and reflect the festival\'s dynamic atmosphere.',
          time: '4:12 PM'
        },
        {
          id: 3,
          type: 'incoming',
          text: 'Mission accomplished! Can we move forward with the merchandise designs next?',
          time: '4:15 PM'
        }
      ]
    },
    {
      id: 6,
      name: 'Robert Kim',
      preview: 'Need consultation for corporate rebrand',
      time: '2d',
      starred: false,
      lastSeen: '2 days ago',
      localTime: 'Local time Sep 8, 2:45 PM',
      avatar: 'RK',
      business: {
        name: 'Law Firm',
        location: 'Chicago, IL',
        icon: <Briefcase className="w-4 h-4" />,
        type: 'Legal'
      },
      messages: [
        {
          id: 1,
          type: 'incoming',
          text: 'Hello, I need consultation for corporate rebrand. Our law firm wants to modernize our image.',
          time: '2:40 PM'
        },
        {
          id: 2,
          type: 'outgoing',
          text: 'Hi Robert! I\'d be happy to help with your law firm\'s rebranding. Corporate rebranding requires careful consideration of your firm\'s values and target audience.',
          time: '2:43 PM'
        },
        {
          id: 3,
          type: 'incoming',
          text: 'Exactly. We want to appear more approachable while maintaining our professional credibility.',
          time: '2:45 PM'
        }
      ]
    },
    {
      id: 7,
      name: 'Jennifer Walsh',
      preview: 'Wedding planning website looks amazing',
      time: '2d',
      starred: false,
      lastSeen: '2 days ago',
      localTime: 'Local time Sep 8, 11:20 AM',
      avatar: 'JW',
      business: {
        name: 'Wedding Planning',
        location: 'Miami, FL',
        icon: <Heart className="w-4 h-4" />,
        type: 'Event'
      },
      messages: [
        {
          id: 1,
          type: 'incoming',
          text: 'The wedding planning website looks amazing! My clients are going to love the elegant design.',
          time: '11:15 AM'
        },
        {
          id: 2,
          type: 'outgoing',
          text: 'Thank you Jennifer! I wanted to create something romantic yet professional that would appeal to your target clientele.',
          time: '11:18 AM'
        },
        {
          id: 3,
          type: 'incoming',
          text: 'You nailed it! The portfolio gallery and contact forms work perfectly.',
          time: '11:20 AM'
        }
      ]
    },
    {
      id: 8,
      name: 'Alex Johnson',
      preview: 'Ready to start the app design project',
      time: '3d',
      starred: false,
      lastSeen: '3 days ago',
      localTime: 'Local time Sep 7, 3:30 PM',
      avatar: 'AJ',
      business: {
        name: 'Mobile App',
        location: 'Seattle, WA',
        icon: <Code className="w-4 h-4" />,
        type: 'Technology'
      },
      messages: [
        {
          id: 1,
          type: 'outgoing',
          text: 'Hi Alex! I reviewed your app requirements and I\'m excited about this project. The fitness tracking concept has great potential.',
          time: '3:25 PM'
        },
        {
          id: 2,
          type: 'incoming',
          text: 'Great! Ready to start the app design project. When can we have our kickoff meeting?',
          time: '3:28 PM'
        },
        {
          id: 3,
          type: 'outgoing',
          text: 'How about this Friday at 2 PM? We can go over the user flows and design requirements in detail.',
          time: '3:30 PM'
        }
      ]
    }
  ];

  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(1);
  const [contactsData, setContactsData] = useState(contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dropdownRef = useRef(null);

  const businessTypes = ['All', ...new Set(contacts.map(contact => contact.business.type))];
  const currentContact = contactsData.find(contact => contact.id === selectedContact);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleStar = (contactId, e) => {
    e.stopPropagation();
    setContactsData(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, starred: !contact.starred }
          : contact
      )
    );
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'outgoing',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setContactsData(prevContacts =>
        prevContacts.map(contact =>
          contact.id === selectedContact
            ? { 
                ...contact, 
                messages: [...contact.messages, newMessage],
                preview: message.length > 30 ? message.substring(0, 30) + '...' : message,
                time: 'now'
              }
            : contact
        )
      );
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredContacts = contactsData.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.business.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || contact.business.type === filterType ||
                         (filterType === 'Starred' && contact.starred);
    return matchesSearch && matchesFilter;
  });

  const handleDropdownAction = (action) => {
    if (action === 'archive') {
      alert(`Archived chat with ${currentContact.name}`);
    } else if (action === 'mute') {
      alert(`Muted notifications for ${currentContact.name}`);
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete the chat with ${currentContact.name}?`)) {
        setContactsData(prevContacts => prevContacts.filter(contact => contact.id !== selectedContact));
        setSelectedContact(contactsData[0]?.id || null);
        setShowSidebar(false); // Close sidebar on mobile after deletion
      }
    }
    setShowDropdown(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-[93vh] bg-white border-b border-gray-300">
      {/* Sidebar Toggle Button (Visible on Mobile) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-[#C8C1F5] text-black rounded-full"
        onClick={toggleSidebar}
      >
        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Left Sidebar - Contacts List */}
      <div 
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static w-64 sm:w-72 lg:w-80 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out z-10 lg:z-auto`}
      >
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <select 
              value={filterType} 
              onChange={handleFilterChange}
              className="text-xs sm:text-sm font-medium text-gray-700 px-2 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8C1F5]"
            >
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
              <option value="Starred">Starred</option>
            </select>
            <div className="relative flex-1 ml-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search contacts..."
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1 bg-gray-100 rounded-full outline-none border border-gray-300 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact.id);
                  setShowSidebar(false); // Close sidebar on mobile after selection
                }}
                className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedContact === contact.id ? 'bg-gray-50' : ''}`}
              >
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                  {contact.avatar}
                </div>
                <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">{contact.time}</span>
                      <button
                        onClick={(e) => toggleStar(contact.id, e)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-4 h-4 transition-colors ${
                            contact.starred 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">{contact.preview}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-3 sm:p-4 text-xs sm:text-sm text-gray-500">No contacts found.</p>
          )}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {currentContact ? (
          <>
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button 
                    className="lg:hidden p-2 text-gray-600"
                    onClick={toggleSidebar}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                    {currentContact.avatar}
                  </div>
                  <div>
                    <h2 className="font-medium text-sm sm:text-base text-gray-900">{currentContact.name}</h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <span>Last seen: {currentContact.lastSeen}</span>
                      <span>{currentContact.localTime}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowDropdown(!showDropdown)}>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {showDropdown && (
                <div ref={dropdownRef} className="absolute right-2 sm:right-4 top-10 sm:top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button 
                    onClick={() => handleDropdownAction('archive')}
                    className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Archive className="w-4 h-4" /> Archive Chat
                  </button>
                  <button 
                    onClick={() => handleDropdownAction('mute')}
                    className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BellOff className="w-4 h-4" /> Mute Notifications
                  </button>
                  <button 
                    onClick={() => handleDropdownAction('delete')}
                    className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Chat
                  </button>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-2 sm:p-4 overflow-y-auto bg-gray-50">
              {currentContact.messages.map((msg) => (
                <div key={msg.id} className={`mb-4 sm:mb-6 ${msg.type === 'outgoing' ? 'flex justify-end' : ''}`}>
                  <div className={`max-w-[80%] sm:max-w-md ${msg.type === 'outgoing' ? 'bg-[#C8C1F5] text-black' : 'bg-white text-gray-800'} rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm`}>
                    <p className="mb-2 text-xs sm:text-sm">{msg.text}</p>
                    
                    {msg.showBusiness && currentContact.business && (
                      <>
                        <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">This message relates to:</div>
                        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                          <div className="w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-black">
                            {currentContact.business.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-xs sm:text-sm text-gray-900">{currentContact.business.name}</h4>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-1">
                              <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                              <span>{currentContact.business.location}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className={`text-xs mt-2 ${msg.type === 'outgoing' ? 'text-black' : 'text-gray-600'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type new messages..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-full outline-none border border-gray-300 text-xs sm:text-sm"
                  />
                </div>
                <button 
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="bg-[#C8C1F5] disabled:bg-gray-100 disabled:cursor-not-allowed text-black p-2 sm:p-3 rounded-full"
                >
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
                <button className="bg-white hover:bg-gray-50 text-[#C8C1F5] border border-[#C8C1F5] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors">
                  Create an offer
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            No contact selected
          </div>
        )}
      </div>
    </div>
  );
}