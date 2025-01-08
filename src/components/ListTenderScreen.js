import React, { useEffect, useState } from "react";
import { List, ListItem } from "react-onsenui";
import { useTranslation } from "react-i18next"; // Import translation hook

const ListTendersScreen = ({ navigator }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Dummy data with provided video links and titles
    const dummyVideos = [
      { title: t("upload_stepwise_images"), link: "https://www.youtube.com/watch?v=GfUa16wfUWw" },
      { title: t("role_and_location_selection"), link: "https://www.youtube.com/watch?v=CrnUYfs3cYk" }
    ];
    setVideos(dummyVideos);
  }, [t]); // Add 't' as dependency to re-run effect on language change

  const handleVideoClick = (link) => {
    window.open(link, "_blank"); // Opens the link in a new tab
  };

  return (
    <div>
      <h2>{t("video_tutorials")}</h2>
      <List
        dataSource={videos}
        renderRow={(video, index) => (
          <ListItem key={index} tappable onClick={() => handleVideoClick(video.link)}>
            <div className="left">
              <img
                src={`https://img.youtube.com/vi/${new URL(video.link).searchParams.get('v')}/0.jpg`}
                alt="thumbnail"
                style={{ width: 50, height: 50 }}
              />
            </div>
            <div className="center">
              <span>{video.title}</span>
            </div>
          </ListItem>
        )}
      />
    </div>
  );
};

export default ListTendersScreen;
