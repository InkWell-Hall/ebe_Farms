import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FarmProjectDetails from "../components/FarmProjectDetails";
import { useContext } from "react";
import { EbeContext } from "../context/EbeContext";
import { useParams, Link } from "react-router";
import { useEffect } from "react";

// Demo Component
const SingleProjectPage = () => {
  const { allFarmProject } = useContext(EbeContext);

  const relatedProjects = [
    {
      id: 2,
      projectName: "Green Valley Rice Farm",
      location: "Tamale, Ghana",
      description: "Organic rice cultivation with modern irrigation systems.",
      estimatedROI: 18,
      durationInMonths: 8,
      totalRequiredFunding: 45000,
      receivedFunding: 22500,
      images: [],
      startDate: "2025-09-01T00:00:00.000Z",
      endDate: "2026-05-01T00:00:00.000Z",
      isActive: true,
    },
    {
      id: 4,
      projectName: "Green Valley Rice Farm",
      location: "Tamale, Ghana",
      description: "Organic rice cultivation with modern irrigation systems.",
      estimatedROI: 18,
      durationInMonths: 8,
      totalRequiredFunding: 45000,
      receivedFunding: 22500,
      images: [],
      startDate: "2025-09-01T00:00:00.000Z",
      endDate: "2026-05-01T00:00:00.000Z",
      isActive: true,
    },
    {
      id: 3,
      projectName: "Cocoa Excellence Initiative",
      location: "Ashanti, Ghana",
      description:
        "Premium cocoa production for international chocolate markets.",
      estimatedROI: 22,
      durationInMonths: 18,
      totalRequiredFunding: 120000,
      receivedFunding: 48000,
      images: [],
      startDate: "2025-07-01T00:00:00.000Z",
      endDate: "2027-01-01T00:00:00.000Z",
      isActive: true,
    },
    {
      id: 4,
      projectName: "Sustainable Cassava Farm",
      location: "Volta Region, Ghana",
      description:
        "Large-scale cassava production for food security and export.",
      estimatedROI: 20,
      durationInMonths: 10,
      totalRequiredFunding: 65000,
      receivedFunding: 13000,
      images: [],
      startDate: "2025-10-01T00:00:00.000Z",
      endDate: "2026-08-01T00:00:00.000Z",
      isActive: true,
    },
  ];
  const { id } = useParams(); // get string id from the URL
  // const numericId = parseInt(id, 10); // convert string to number

  const selectedProject = allFarmProject?.find((item) => item.id === id);
  console.log(selectedProject);
  useEffect(() => {
    console.log(selectedProject);
    window.scroll(0, 0);
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="mt-7">
        <FarmProjectDetails
          id={selectedProject.id}
          project={selectedProject}
          relatedProjects={relatedProjects}
        />
      </div>
      <Footer />
    </>
  );
};

export default SingleProjectPage;
