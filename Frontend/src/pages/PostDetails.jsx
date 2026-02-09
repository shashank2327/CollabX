import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RequestModal from '../components/RequestModal';
import IncomingRequestsModal from '../components/IncomingRequestsModal';
import api from '../lib/axios';
import { API_PATHS } from '../lib/apiPath';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import { 
  Github, ArrowLeft, Send, Loader2, User, Code2, CheckCircle2, 
  Users, MessageSquare 
} from 'lucide-react';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState(null);
  const [requests, setRequests] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal States
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);

  // 1. Fetch Post Details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(API_PATHS.HELP_POST.GET_ONE(id));
        setPost(response.data.helpPost);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load post.");
        navigate('/feed');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  // ---------------------------------------------------------
  // 🔐 ROBUST OWNER CHECK (Reactive & Safe)
  // ---------------------------------------------------------
  const isOwner = useMemo(() => {
    if (!user || !post) return false;

    // Handle different user object structures (populated vs flat)
    const currentUserId = user._id || user.id || user?.user?._id;
    const postOwnerId = post.ownerId?._id || post.ownerId;

    if (!currentUserId || !postOwnerId) return false;

    return String(currentUserId) === String(postOwnerId);
  }, [user, post]);
  // ---------------------------------------------------------

  // 2. Fetch Requests
  const handleGetRequests = async () => {
    setIsLoadingRequests(true);
    try {
      const res = await api.get(API_PATHS.CONTRIBUTION_REQUEST.GET_BY_HELP_POST(id));
      const fetchedRequests = res.data.requests || [];
      setRequests(fetchedRequests);
      setIsReviewModalOpen(true);
      
      if (fetchedRequests.length === 0) {
        toast('No requests found for this post.', { icon: 'ℹ️' });
      }
    } catch (error) {
      console.error("Failed to load requests", error);
      toast.error("Failed to fetch requests.");
    } finally {
      setIsLoadingRequests(false);
    }
  };

  // 3. Handle Owner Actions
  const handleRequestAction = async (requestId, action) => {
    try {
      if (action === 'accept') {
        await api.patch(API_PATHS.CONTRIBUTION_REQUEST.ACCEPT(requestId));
        toast.success("Contributor accepted!");
      } else {
        await api.patch(API_PATHS.CONTRIBUTION_REQUEST.REJECT(requestId));
        toast.success("Request rejected.");
      }
      
      handleGetRequests();
      const res = await api.get(API_PATHS.HELP_POST.GET_ONE(id));
      setPost(res.data.helpPost);

    } catch (error) {
      toast.error(`Failed to ${action} request.`);
    }
  };

  // 4. Handle Visitor Action
  const handleSendRequest = async (message) => {
    setIsRequesting(true);
    try {
      await api.post(API_PATHS.CONTRIBUTION_REQUEST.CREATE(id), { message });
      toast.success("Request sent!");
      setIsRequestModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed.");
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center bg-brand-black"><Loader2 className="animate-spin text-brand-primary" /></div>;
  if (!post) return null;

  return (
    <div className="flex bg-brand-black min-h-screen text-brand-text">
      <Sidebar />
      
      {/* --- MODALS --- */}
      {!isOwner && (
        <RequestModal 
            isOpen={isRequestModalOpen}
            onClose={() => setIsRequestModalOpen(false)}
            onSubmit={handleSendRequest}
            isLoading={isRequesting}
            postTitle={post.title}
        />
      )}

      {isOwner && (
        <IncomingRequestsModal 
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            requests={requests}
            onAccept={(reqId) => handleRequestAction(reqId, 'accept')}
            onReject={(reqId) => handleRequestAction(reqId, 'reject')}
        />
      )}

      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen relative bg-brand-black">
        <div className="max-w-5xl mx-auto pb-24 relative z-10">
          
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-muted hover:text-brand-primary mb-6 font-medium transition-colors">
            <ArrowLeft size={20} /> Back
          </button>

          {/* Owner Banner */}
          {isOwner && (
            <div className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-4 py-2 rounded-lg mb-6 flex items-center gap-2">
              <CheckCircle2 size={16} /> 
              <span className="text-sm font-semibold">You are the owner of this post.</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Post Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-brand-graphite rounded-3xl border border-brand-border shadow-lg overflow-hidden p-8">
                
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                     <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase border ${
                        post.status === 'OPEN' 
                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                        : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                     }`}>
                        {post.status}
                     </span>
                </div>

                <h1 className="text-3xl font-extrabold text-white mb-4">{post.title}</h1>
                <p className="text-brand-muted whitespace-pre-line mb-8 leading-relaxed text-lg">{post.description}</p>
                
                {post.expectedContribution && (
                    <div className="mb-6 bg-black/40 p-5 rounded-2xl border border-brand-border">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-brand-primary" /> Expected Contribution
                        </h4>
                        <p className="text-sm text-brand-muted">{post.expectedContribution}</p>
                    </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {post.techStack.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-black/40 border border-brand-border rounded-lg text-sm font-medium text-gray-300 flex items-center gap-1.5">
                            <Code2 size={14} className="text-brand-primary"/> {t}
                        </span>
                    ))}
                </div>

                {/* Owner Info Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-brand-border">
                    <div className="flex items-center gap-3">
                        <img src={post.ownerId?.avatarUrl || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full bg-black border border-brand-border object-cover" alt="" />
                        <div>
                            <p className="font-bold text-white text-sm">{post.ownerId?.name || "Unknown"}</p>
                            <p className="text-xs text-brand-muted">Owner</p>
                        </div>
                    </div>
                    {post.githubRepoUrl && (
                        <a href={post.githubRepoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-primary font-semibold hover:underline text-sm">
                            <Github size={16} /> Repository
                        </a>
                    )}
                </div>
              </div>

               {/* CONTRIBUTORS SECTION */}
               <div className="bg-brand-graphite rounded-3xl border border-brand-border shadow-sm p-8">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Users size={20} className="text-brand-primary" />
                    Project Contributors ({post.contributors?.length || 0})
                  </h3>
                  
                  {post.contributors && post.contributors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {post.contributors.map((contributor) => {
                         const userObj = contributor.userId || contributor; 
                         return (
                           <div key={contributor._id} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-brand-border">
                             <img src={userObj.avatarUrl || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full bg-black border border-brand-border object-cover" alt="" />
                             <div className="overflow-hidden">
                               <p className="font-semibold text-white truncate text-sm">{userObj.name}</p>
                               <p className="text-xs text-brand-muted truncate">@{userObj.githubUsername}</p>
                             </div>
                           </div>
                         );
                      })}
                    </div>
                  ) : (
                    <p className="text-brand-muted text-sm italic">No contributors yet.</p>
                  )}
               </div>
            </div>

            {/* RIGHT COLUMN: Sidebar Actions */}
            <div className="space-y-6">
              
              {/* --- OWNER VIEW --- */}
              {isOwner ? (
                <div className="bg-brand-graphite rounded-2xl border border-brand-border p-6 text-center shadow-lg sticky top-8 animate-fadeIn">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary border border-brand-primary/20">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="font-bold text-white mb-2">Manage Requests</h3>
                  <p className="text-sm text-brand-muted mb-6">
                    See who wants to contribute to your project.
                  </p>
                  
                  <button
                    onClick={handleGetRequests}
                    disabled={isLoadingRequests}
                    className="w-full bg-brand-primary hover:bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 relative flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoadingRequests ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Loading...
                      </>
                    ) : (
                      "View Requests"
                    )}
                  </button>
                </div>
              ) : (
                /* --- VISITOR VIEW --- */
                post.status === 'OPEN' && (
                 <div className="bg-brand-graphite rounded-2xl border border-brand-border p-6 text-center shadow-lg sticky top-8">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary border border-brand-primary/20">
                        <Send size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Interested in helping?</h3>
                    <p className="text-sm text-brand-muted mb-6">Send a request to the project owner to join the team.</p>
                    <button
                      onClick={() => setIsRequestModalOpen(true)}
                      className="w-full bg-brand-primary hover:bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
                    >
                      Request to Contribute
                    </button>
                 </div>
                )
              )}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;