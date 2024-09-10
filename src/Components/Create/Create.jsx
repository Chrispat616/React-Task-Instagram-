import moment from 'moment';

const Create = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleDateString(),
      uploadTime: moment().format('YYYY-MM-DD HH:mm:ss'), 
      url: URL.createObjectURL(file),
    }));
    onFileUpload(fileData);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*,video/*"
      />
    </div>
  );
};

export default Create;
