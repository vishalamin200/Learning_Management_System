 import PropTypes from 'prop-types'

const CourseIntroduction = ({ category }) => {
  const getIntroduction = (category) => {
    switch (category) {
      
      case 'web-development':
        return "This course is crafted for aspiring web developers aiming to build dynamic and responsive websites. It covers essential technologies such as HTML, CSS, and JavaScript, along with modern frameworks like React or Angular. By the end of this course, students will be able to create visually appealing, user-friendly web applications.";

      case 'data-science':
        return "This course is tailored for individuals pursuing a career in data science. It delves into data analysis, statistical modeling, and machine learning, providing practical experience with tools like Python and R. Students will learn to extract actionable insights from complex datasets, enabling them to make informed, data-driven decisions.";

      case 'machine-learning':
        return "This course is intended for those passionate about understanding and implementing machine learning algorithms. It covers both supervised and unsupervised learning techniques, exploring models like neural networks and support vector machines. Students will gain the skills needed to develop predictive models and automate decision-making processes.";

      case 'generative-ai':
        return "This course is designed for students eager to explore the frontier of generative AI. It focuses on creating AI models capable of generating realistic content, such as text, images, or music. Students will learn about advanced techniques like GANs and transformers, along with the ethical considerations of AI-generated content.";

      case 'cloud-computing':
        return "This course is ideal for future cloud professionals interested in mastering cloud services and architecture. It offers in-depth knowledge of deploying, managing, and scaling applications on platforms like AWS, Azure, or Google Cloud. Students will understand the advantages of cloud infrastructure and how to leverage it for business success.";

      case 'data-structures':
        return "This course is designed for computer science students looking to deepen their understanding of data structures. It covers fundamental concepts such as arrays, linked lists, trees, and graphs. Students will learn how to efficiently store, organize, and manipulate data, which is crucial for optimizing algorithm performance in real-world applications.";

      case 'mysql':
        return "This course is perfect for those looking to master MySQL, a powerful relational database management system. It focuses on the design, querying, and management of databases, ensuring students can maintain data integrity and optimize performance. By the end of the course, participants will be adept at handling large-scale database operations.";

      case 'operating-system':
        return "This course is meant for students seeking to understand the core functions of operating systems. It covers essential topics like process management, memory allocation, and file systems. By exploring how software interacts with hardware, students will gain a comprehensive understanding of how operating systems manage resources efficiently.";

      case 'computer-networks':
        return "This course is designed for those pursuing a career in networking. It introduces the principles of computer networks, including protocols, IP addressing, and network security. Students will learn how to design, implement, and maintain secure and efficient network infrastructures, which are critical for the communication and operation of modern digital systems.";

      case 'java':
        return "This course is suited for aspiring Java developers. It provides a solid foundation in Java programming, covering object-oriented principles, data structures, and application development. Students will learn to create versatile, platform-independent applications, equipping them with the skills needed to develop robust and scalable software solutions in Java.";

      case 'system-design':
        return "This course is geared towards students interested in mastering the art of system design. It covers key concepts like scalability, load balancing, and microservices architecture. By the end of the course, students will be able to design complex, high-performing systems that can handle large-scale traffic and evolving business needs.";

      case 'ui-ux':
        return "This course is for aspiring UI/UX designers focused on creating user-centered digital experiences. It covers the principles of usability, accessibility, and visual design. Students will learn to craft intuitive and aesthetically pleasing interfaces that enhance the overall user experience, ensuring products meet user needs and expectations effectively.";

      case 'c++':
        return "This course is designed for those wanting to become proficient in C++. It covers the language's syntax, object-oriented concepts, and advanced memory management techniques. Students will learn to develop high-performance applications, gaining the skills required to tackle complex software challenges using C++ in industries like gaming, finance, and system software.";

      default:
        return "This course provides comprehensive insights into the chosen field, equipping students with the knowledge and skills needed to excel in their careers. It is designed to offer practical experience and foundational understanding, preparing students for success in their respective domains.";
    }
  };

  return (
    <div>
      <p>{getIntroduction(category)}</p>
    </div>
  );
};

CourseIntroduction.propTypes={
  category:PropTypes.string

}

export default CourseIntroduction;
