import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const SubmissionsTable = ({ submissions, handleEdit, handleDelete, handlePublish, handleUnpublish, handlePreview }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="text-left p-2">Volunteer Name</th>
          <th className="text-left p-2">EmployeeId</th>
          <th className="text-left p-2">Overlay with Video</th>
          <th className="text-left p-2">Document</th>
          <th className="text-left p-2">Generated</th>
          <th className="text-left p-2">Timestamp</th>
          <th className="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission) => (
          <tr key={submission.id}>
            <td className="p-2">
              {submission.volunteerName}
              <br />
              {submission.speciality}
            </td>
            <td className="p-2">{submission.volunteerId}</td>
            <td className="p-2">
              <Dialog>
                <DialogTrigger>
                  <img src={submission.overlayUploadUrl} alt="Overlay" className="w-8 h-16 aspect-video bg-black cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <img src={submission.overlayUploadUrl} alt="Overlay" className="w-full h-auto" />
                </DialogContent>
              </Dialog>
            </td>
            <td className="p-2">
              <Dialog>
                <DialogTrigger>
                  <img src={submission.documentUploadUrl} alt="Document" className="w-16 h-16 object-cover cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <img src={submission.documentUploadUrl} alt="Document" className="w-full h-auto" />
                </DialogContent>
              </Dialog>
            </td>
            <td className="p-2">
              {submission.generatedVideoUrl ? (
                <Dialog>
                  <DialogTrigger>
                    <video src={submission.generatedVideoUrl} className="w-16 h-16 cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <video src={submission.generatedVideoUrl} className="w-full h-auto" controls />
                  </DialogContent>
                </Dialog>
              ) : (
                "No Video"
              )}
            </td>
            <td className="p-2">{new Date(submission.timestamp.seconds * 1000).toLocaleString()}</td>
            <td className="p-2">
              <button onClick={() => handleEdit(submission)} className="text-blue-500">
                Edit
              </button>
              <button onClick={() => handleDelete(submission)} className="text-red-500 ml-2">
                Delete
              </button>
              <div className="flex flex-col">
                <button onClick={() => handlePublish(submission)} className="text-blue-500 bg-orange-900 ml-2">
                  Publish
                </button>

                <button onClick={() => handleUnpublish(submission)} className="text-orange-500  bg-orange-900 ml-2">
                  UnList
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionsTable;
