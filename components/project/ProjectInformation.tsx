import { Descriptions } from 'antd';

const ProjectInformation = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Descriptions title="프로젝트 인포"></Descriptions>
      <div>프로젝트 code : xxxxxx-xxxxx</div>
      <div>시나리오 : xxxxx</div>
      <div>프로젝트 flag : xxxx|xxxx|xxxx</div>
      <div>프로젝트 권한 : 1</div>
    </div>
  );
};

export default ProjectInformation;
