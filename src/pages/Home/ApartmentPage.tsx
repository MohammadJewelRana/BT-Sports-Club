 // import img from '../../assets/images/pagesBackground/contactPage.jpg'
// import img from "../../assets/images/pagesBackground/c.jpg";
 

const ApartmentPage = () => {
  return (
    <div>
 

      <div className="bg-gray-100  ">
        {/* Contact Information Section */}
        <section className="py-12 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-semibold">Address:</p>
                    <p>123 Street Name, City, Country</p>
                  </li>
                  <li>
                    <p className="font-semibold">Phone:</p>
                    <p>(123) 456-7890</p>
                  </li>
                  <li>
                    <p className="font-semibold">Email:</p>
                    <p>info@example.com</p>
                  </li>
                </ul>
              </div>
              {/* Right Column: Map */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Replace with your map component or iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.170081176938!2d90.38535587589851!3d23.81255028638652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c700034ca181%3A0x4f7492fad26adcf9!2sBismillah%20Tower!5e0!3m2!1sen!2sbd!4v1723490092282!5m2!1sen!2sbd"
                  loading="lazy"
                  // referrerpolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>



 

              </div>
            </div>
          </div>
        </section>

   
      </div>
    </div>
  );
};

export default ApartmentPage;
