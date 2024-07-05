import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled.video`
  width: 100%;
  height: 100%;
`;

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CaptureButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.brand.primaryHover};
  }
`;

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const cameraRef = useRef(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    async function getPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setPermission(true);
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
        setPermission(false);
      }
    }
    getPermission();
  }, []);

  const snapPics = async () => {
    if (cameraRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = cameraRef.current.videoWidth;
      canvas.height = cameraRef.current.videoHeight;
      canvas.getContext("2d").drawImage(cameraRef.current, 0, 0);
      const photoUri = canvas.toDataURL("image/png");
      localStorage.setItem(`${user.uid}-photo`, photoUri);
      navigation.goBack();
    }
  };

  if (permission === null) {
    return (
      <SafeArea>
        <p>Requesting camera permission...</p>
      </SafeArea>
    );
  }

  if (permission === false) {
    return (
      <SafeArea>
        <p>No permission to use camera. Please check your browser settings.</p>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <CameraContainer>
        <ProfileCamera ref={cameraRef} autoPlay playsInline></ProfileCamera>
        <CaptureButton onClick={snapPics}>Capture</CaptureButton>
      </CameraContainer>
    </SafeArea>
  );
};
