import { formatImageUrl } from '../../utils/helpers';
import { imageStyles } from './CustomerOptionLabel.constants';

const CustomerOptionLabel = ({ attributes }) => {
  const { first_name, last_name, phone_number, Avatar } = { ...attributes };

  return (
    <div>
      <img
        style={imageStyles}
        alt={`${first_name} ${last_name}`}
        src={formatImageUrl(`${Avatar?.url}`)}
      />
      {first_name} {last_name} {phone_number}
    </div>
  );
};

export default CustomerOptionLabel;
