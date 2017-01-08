// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import Snackbar from 'material-ui/Snackbar';

// Child Components icons
import Github from './achievements/external/github.es6';
import StackOverflow from './achievements/external/stackoverflow.es6';
import Youtube from './achievements/external/youtube.es6';
import Linkedin from './achievements/external/linkedin.es6';
import Meetup from './achievements/external/meetup.es6';
import ProductHunt from './achievements/external/producthunt.es6';
import Connections from './connections.es6';

// Mutation
import UnpinAchievement from '../../mutations/developer/unpinAchievement.es6';
import UpdateAchievement from '../../mutations/developer/updateAchievement.es6';

// Register components to a Map()
const componentsMap = new Map();
componentsMap.set('github', Github);
componentsMap.set('stackoverflow', StackOverflow);
componentsMap.set('youtube', Youtube);
componentsMap.set('linkedin', Linkedin);
componentsMap.set('meetup', Meetup);
componentsMap.set('producthunt', ProductHunt);

const renderEmptyPlaceholder = () => (
  <div
    className="no_content text-center"
    style={{
      marginLeft: 100,
      border: '5px solid #f2f2f2',
      color: '#777',
    }}
  >
    <h1 style={{ fontWeight: 500, fontSize: 18 }}>
      No pinned achievements or contributions
    </h1>
  </div>
);

class DeveloperAchievements extends Component {
  constructor(props) {
    super(props);
    this.setNotification = this.setNotification.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      notification: '',
      open: false,
    };
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  update(achievement, newData) {
    const updatePromise = new Promise((resolve, reject) => {
      const onFailure = (transaction) => {
        const error = transaction.getError() || new Error('Mutation failed.');
        let errorMessage;

        if (error.list.errors && Array.isArray(error.list.errors)) {
          errorMessage = error.list.errors[0].message;
        } else {
          errorMessage = error.message;
        }
        this.setNotification(errorMessage);
        reject(false);
      };

      const onSuccess = () => {
        this.setNotification('Successfully updated');
        resolve(true);
      };

      Relay.Store.commitUpdate(new UpdateAchievement({
        id: achievement.id,
        ...newData,
      }), { onFailure, onSuccess });
    });

    return updatePromise;
  }

  remove(event, achievement) {
    event.preventDefault();

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;

      if (error.list.errors && Array.isArray(error.list.errors)) {
        errorMessage = error.list.errors[0].message;
      } else {
        errorMessage = error.message;
      }
      this.setNotification(errorMessage);
    };

    Relay.Store.commitUpdate(new UnpinAchievement({
      id: achievement.import_id,
      developerId: achievement.developer_id,
    }), { onFailure });
  }

  loadMore() {
    this.props.relay.setVariables({
      first: this.props.relay.variables.first + 20,
    });
  }

  render() {
    const { developer } = this.props;
    const renderAchievementComponent = (achievement) => {
      const Achievement = componentsMap.get(achievement.source_name);
      return (
        <Achievement
          achievement={achievement}
          key={achievement.id}
          remove={this.remove}
          update={this.update}
        />
      );
    };

    return (
      <section className="achievements">
        <div className="starting-point" />
        <div
          className="achievements-intro"
          style={{
            textAlign: 'center',
            margin: '50px 0 50px 100px',
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 500 }}>
            Contributions and Achievements
          </h2>
          <p style={{ color: '#777', maxWidth: '90%', margin: '5px auto' }}>
            {developer.is_owner ?
              'Pin your contributions and achievements from Github, ' +
              'Linkedin, Stackoverflow, ProductHunt, Meetup and Youtube.' :
              'Pinned contributions and achievements from Github, ' +
              'Linkedin, Stackoverflow, ProductHunt, Meetup and Youtube'
            }
          </p>
        </div>

        {developer.is_owner ? <Connections developer={developer} /> : ''}

        {developer.achievements.edges.length > 0 ?
          developer.achievements.edges.map(({ node }) => (
            renderAchievementComponent(node)
          )) : developer.is_owner ? '' : renderEmptyPlaceholder()
        }

        <div className="notifications">
          <Snackbar
            open={this.state.open}
            ref={node => (this.notification = node)}
            message={this.state.notification}
            autoHideDuration={5000}
            action={'Dismiss'}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </section>
    );
  }
}

DeveloperAchievements.propTypes = {
  relay: React.PropTypes.object,
  developer: React.PropTypes.object,
};

const DeveloperAchievementsContainer = Relay.createContainer(DeveloperAchievements, {
  initialVariables: {
    first: 20,
  },
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        is_owner,
        ${Connections.getFragment('developer')},
        achievements(first: $first) {
          edges {
            node {
              id,
              source_name,
              ${Github.getFragment('achievement')},
              ${StackOverflow.getFragment('achievement')},
              ${Youtube.getFragment('achievement')},
              ${Linkedin.getFragment('achievement')},
              ${Meetup.getFragment('achievement')},
              ${ProductHunt.getFragment('achievement')}
            }
          }
        }
      }
    `,
  },
});

export default DeveloperAchievementsContainer;
