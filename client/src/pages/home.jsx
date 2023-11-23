import { useDispatch, useSelector } from "react-redux";
import Contact from "../components/contact/contact";
import Features from "../components/features/feature";
import Hero from "../components/hero/hero";
import Loader from "../components/LOADER/loader";
import { useEffect } from "react";
import {
  getContact,
  getHeroDetails,
  getService,
} from "../redux/actions/customize/customActions";
import { useNavigate } from "react-router";
// import HeroImg from "./hero";

export default function Home() {
  const isLoading = useSelector((state) => state.hero.isLoading);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.hero.details);
  const serviceDetails = useSelector((state) => state.service.details);
  const serviceLoading = useSelector((state) => state.service.isLoading);
  const contactDetails = useSelector((state) => state.contact.details);
  const contactLoading = useSelector((state) => state.contact.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHeroDetails(navigate));
    dispatch(getService(navigate));
    dispatch(getContact(navigate));
  }, [dispatch, navigate]);
  return (
    <>
      {isLoading && serviceLoading && contactLoading ? (
        <div className="flex justify-center mt-64">
          <Loader />
        </div>
      ) : (
        <>
          {/* <HeroImg /> */}
          <Hero details={details} />
          <Features details={serviceDetails} />
          <Contact details={contactDetails} />
        </>
      )}
    </>
  );
}
