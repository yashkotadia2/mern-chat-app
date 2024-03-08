import useSendMessage from "../../hooks/useSendMessage";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useState, useEffect } from "react";
const { TextArea } = Input;
import { IoSend } from "react-icons/io5";
import "../../assets/css/messageInput.scss";
import sendImage from "../../assets/icons/upload.svg";
import toast from "react-hot-toast";

const suffix = <></>;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }); // Convert image to base64

const MessageInput = () => {
  const [form] = Form.useForm();
  const { loading, sendMessage } = useSendMessage();

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [uploadListType, setUploadListType] = useState("picture");

  const onSendMessage = async (value) => {
    if (!value) return;
    form.resetFields();
    setFileList([]);
    await sendMessage(value);
  };

  const onFinished = (values) => {
    if (fileList.length >= 1) {
      onSendMessage(values.file);
    } else {
      onSendMessage(values.message);
    }
    // onSendMessage(values.message);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      info.file.status = "done";
    }
    let isFileOk = beforeUpload(info.file);
    if (isFileOk) {
      setFileList(info.fileList);
    } else {
      return;
    }

    let base64Val = await getBase64(info?.fileList[0].originFileObj);
    form.setFieldsValue({ file: base64Val });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = (file) => {
    console.log("isTypeImage", file.type.split("/")[0] == "image");
    
    const isTypeImage = file.type.split("/")[0] == "image";
    if (!isTypeImage) {
      toast.error("You can only upload Image file!");
    }
    const isLt5M = file.size / 1024 / 1024 <= 5;
    if (!isLt5M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isTypeImage && isLt5M;
  };

  const UploadImageLogo = () => {
    return (
      <div
        style={{
          width: "25px",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={sendImage}
          alt="upload"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (fileList.length == 0) {
      setUploadListType("picture");
    } else {
      setUploadListType("picture-card");
    }
  }, [fileList]);

  useEffect(() => {
    if (uploadListType === "picture-card") {
      window.scrollTo(0, document.body.scrollHeight, { behavior: "smooth" });
    }
  }, [uploadListType]);

  return (
    <div className="message-input-container">
      <Form
        style={{ display: "flex" }}
        form={form}
        onFinish={onFinished}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          style={{
            width: "100%",
            position: "relative",
          }}
          name={"message"}
        >
          <TextArea
            disabled={loading || fileList.length >= 1}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder="Type a message..."
            onPressEnter={() => {
              form.submit();
            }}
          />
        </Form.Item>
        <Form.Item name={"file"}>
          <div
            style={{
              position: "absolute",
              right: "12px",
              top: uploadListType === "picture-card" ? "35px" : "1px",
            }}
          >
            <Upload
              // action=""
              fileList={fileList}
              listType={uploadListType}
              onChange={(info) => handleChange(info)}
              onPreview={handlePreview}
              maxCount={1}
            >
              {fileList.length >= 1 ? null : (
                <Button
                  disabled={loading}
                  style={{
                    width: "fit-content",
                    height: "30px",
                    border: "none",
                    paddingBlock: "0",
                    paddingTop: "2px",
                  }}
                  icon={<UploadImageLogo />}
                />
              )}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </Form.Item>
        <Form.Item
          style={{
            width: "fit-content",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<IoSend size={22} />}
            size="medium"
            style={{
              paddingInline: "0.5rem",
              width: "fit-content",
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default MessageInput;
