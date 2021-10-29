import React from 'react'
import { Navigation, Frame } from '@shopify/polaris';
import {
  DuplicateMinor,
  HomeMajor,
  QuestionMarkMajor,
  NoteMinor,
  ViewMinor,
  SearchMinor
} from '@shopify/polaris-icons';
import {Router} from '../routes'
  
class AppContainer extends React.Component {

  render() {

    const navigationMarkup = <Navigation location="/">
    <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/index'),
          label: 'General',
          icon: HomeMajor,
        },
        {
          onClick: () => Router.pushRoute('/options'),
          label: 'Options',
          icon: DuplicateMinor,
        },
        {
          onClick: () => Router.pushRoute('/questions'),
          label: 'Questions',
          icon: QuestionMarkMajor,
          }
      ]}
      />
    <Navigation.Section
      items={[
        {
          onClick: () => Router.pushRoute('/preview'),
          label: 'Preview',
          icon: ViewMinor,
        },
      ]}
      separator
      />
    </Navigation>

    return (
      <Frame
        navigation={navigationMarkup}>
        { this.props.children }
        </Frame>
    )
    };
}

export default AppContainer;