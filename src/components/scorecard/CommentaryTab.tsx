interface Commentary {
  over: string;
  ball?: number;
  text: string;
  timestamp?: string;
  runs?: number;
  wicket?: boolean;
  boundary?: 'four' | 'six';
}

interface CommentaryTabProps {
  commentaryData:any;
  loading: boolean;
}

export const CommentaryTab = ({ commentaryData, loading }: CommentaryTabProps) => {
  console.log(commentaryData);
  if (loading) return <div>Loading...</div>;
  if (!commentaryData) return <div className="">No commentary available</div>;

  const isOverComment = (commentary: Commentary) => !commentary.over;

  const getBallClass = (commentary: Commentary) => {
    if (!commentary.over) return 'bg-white-800';
    if (commentary.wicket) return 'bg-red-600';
    if (commentary.boundary === 'six') return 'bg-purple-600';
    if (commentary.boundary === 'four') return 'bg-blue-600';
    if (commentary.runs && commentary.runs > 0) return 'bg-green-600';
    return 'bg-white-700';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {commentaryData.map((comment:any, index:any) => (
          <div
            key={`${comment.over || 'comment'}-${index}`}
            className={`border rounded-lg p-4 bg-white ${
              isOverComment(comment) ? 'border' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              {!isOverComment(comment) && (
                <div
                  className={`${getBallClass(
                    comment
                  )} w-12 h-12 rounded-full flex items-center justify-center bg-red-600 text-white font-bold`}
                >
                  {comment.over}
                </div>
              )}
              <div className={`flex-1 ${isOverComment(comment) ? 'pl-0' : ''}`}>
                <div className={` ${isOverComment(comment) ? 'font-normal' : 'font-medium'}`}>
                  {comment.text}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 