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
        console.log(response)
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

  /// ---------------------------------------------------------
// 🔐 ROBUST OWNER CHECK (Reactive & Safe)
// ---------------------------------------------------------
const isOwner = useMemo(() => {
  if (!user || !post) return false;

  const currentUserId =
    user._id || user.id || user?.user?._id;

  const postOwnerId =
    post.ownerId?._id || post.ownerId;

  if (!currentUserId || !postOwnerId) return false;

  return String(currentUserId) === String(postOwnerId);
}, [user, post]);

  // ---------------------------------------------------------

  // 2. Fetch Requests (ON CLICK ONLY)
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

  // 3. Handle Owner Actions (Accept/Reject)
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

  // 4. Handle Visitor Action (Send Request)
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

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-[#006D77]" /></div>;
  if (!post) return null;

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar />
      
      {/* --- VISITOR MODAL --- */}
      {!isOwner && (
        <RequestModal 
            isOpen={isRequestModalOpen}
            onClose={() => setIsRequestModalOpen(false)}
            onSubmit={handleSendRequest}
            isLoading={isRequesting}
            postTitle={post.title}
        />
      )}

      {/* --- OWNER MODAL (Requests List) --- */}
      {isOwner && (
        <IncomingRequestsModal 
            isOpen={isReviewModalOpen}
            onClose={() => setIsReviewModalOpen(false)}
            requests={requests}
            onAccept={(reqId) => handleRequestAction(reqId, 'accept')}
            onReject={(reqId) => handleRequestAction(reqId, 'reject')}
        />
      )}

      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen relative">
        <div className="max-w-5xl mx-auto pb-24">
          
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#006D77] mb-6 font-medium">
            <ArrowLeft size={20} /> Back
          </button>

          {/* Owner Banner */}
          {isOwner && (
            <div className="bg-teal-50 border border-teal-200 text-teal-800 px-4 py-2 rounded-lg mb-6 flex items-center gap-2">
              <CheckCircle2 size={16} /> 
              <span className="text-sm font-semibold">You are the owner of this post.</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Post Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
                <div className="flex items-center justify-between mb-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        post.status === 'OPEN' ? 'bg-[#E6F0F1] text-[#006D77]' : 'bg-gray-100 text-gray-500'
                     }`}>
                        {post.status}
                     </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-gray-600 whitespace-pre-line mb-6 leading-relaxed">{post.description}</p>
                
                {post.expectedContribution && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#006D77]" /> Expected Contribution
                        </h4>
                        <p className="text-sm text-gray-600">{post.expectedContribution}</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                    {post.techStack.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
                            {t}
                        </span>
                    ))}
                </div>

                {/* Owner Info Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <img src={post.ownerId?.avatarUrl || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full bg-gray-100 object-cover" alt="" />
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{post.ownerId?.name || "Unknown"}</p>
                            <p className="text-xs text-gray-500">Owner</p>
                        </div>
                    </div>
                    {post.githubRepoUrl && (
                        <a href={post.githubRepoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#006D77] font-semibold hover:underline text-sm">
                            <Github size={16} /> Repository
                        </a>
                    )}
                </div>
              </div>

               {/* CONTRIBUTORS SECTION */}
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users size={20} className="text-[#006D77]" />
                    Project Contributors ({post.contributors?.length || 0})
                  </h3>
                  
                  {post.contributors && post.contributors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {post.contributors.map((contributor) => {
                         const userObj = contributor.userId || contributor; 
                         return (
                           <div key={contributor._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                             <img src={userObj.avatarUrl || "https://via.placeholder.com/40"} className="w-10 h-10 rounded-full bg-white object-cover" alt="" />
                             <div className="overflow-hidden">
                               <p className="font-semibold text-gray-900 truncate text-sm">{userObj.name}</p>
                               <p className="text-xs text-gray-500 truncate">@{userObj.githubUsername}</p>
                             </div>
                           </div>
                         );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">No contributors yet.</p>
                  )}
               </div>
            </div>

            {/* RIGHT COLUMN: Sidebar */}
            <div className="space-y-6">
              
              {/* --- SCENARIO 1: I AM THE OWNER --- */}
              {isOwner ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm sticky top-8 animate-fadeIn">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#006D77]">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Manage Requests</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    See who wants to contribute to your project.
                  </p>
                  
                  <button
                    onClick={handleGetRequests}
                    disabled={isLoadingRequests}
                    className="w-full bg-[#006D77] hover:bg-[#00555D] text-white py-3 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5 relative flex items-center justify-center gap-2 disabled:opacity-70"
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
                /* --- SCENARIO 2: I AM A VISITOR --- */
                post.status === 'OPEN' && (
                 <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-sm sticky top-8">
                    <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#006D77]">
                        <Send size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Interested in helping?</h3>
                    <p className="text-sm text-gray-500 mb-6">Send a request to the project owner to join the team.</p>
                    <button
                      onClick={() => setIsRequestModalOpen(true)}
                      className="w-full bg-[#006D77] hover:bg-[#00555D] text-white py-3 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5"
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