import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Platform,
  Text,
  View,
} from 'react-native';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import {MediaView} from './MediaView';
import {Events, Logger} from './utils';
import styled from 'styled-components/native'
import { colors } from '../colors';

export const AdView = React.memo(({isSetGap, index, media, type, loadOnMount = true}) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const nativeAdRef = useRef();

  const onAdFailedToLoad = (event) => {
    setError(true);
    setLoading(false);
    /**
     * Sometimes when you try to load an Ad, it will keep failing
     * and you will recieve this error: "The ad request was successful,
     * but no ad was returned due to lack of ad inventory."
     *
     * This error is not a bug or issue with our Library.
     * Just remove the app from your phone & clean your build
     * folders by running ./gradlew clean in /android folder
     * and for iOS clean the project in xcode. Hopefully the error will
     * be gone.
     *
     * [iOS] If you get this error: "Cannot find an ad network adapter with
     * the name(s): com.google.DummyAdapter". The ad inventory is empty in your
     * location. Try using a vpn to get ads in a different location.
     *
     * If you have recently created AdMob IDs for your ads, it might take
     * a few days until the ads will start showing.
     */
    Logger('AD', 'FAILED', event.error?.message);
  };

  const onAdLoaded = () => {
    Logger('AD', 'LOADED', 'Ad has loaded successfully');
  };

  const onAdClicked = () => {
    Logger('AD', 'CLICK', 'User has clicked the Ad');
  };

  const onAdImpression = () => {
    Logger('AD', 'IMPRESSION', 'Ad impression recorded');
  };

  const onNativeAdLoaded = event => {
    Logger('AD', 'RECIEVED', 'Unified ad  Recieved', event);
    setLoading(false);
    setLoaded(true);
    setError(false);
    setAspectRatio(event.aspectRatio);
  };

  const onAdLeftApplication = () => {
    Logger('AD', 'LEFT', 'Ad left application');
  };

  const onViewableItemsChanged = useCallback(
    event => {
      /**
       * [STEP IV] We check if any AdViews are currently viewable.
       */
      let viewableAds = event.viewableItems.filter(
        i => i.key.indexOf('ad') !== -1,
      );

      viewableAds.forEach(adView => {
        if (adView.index === index && !loaded) {
          /**
           * [STEP V] If the ad is viewable and not loaded
           * already, we will load the ad.
           */
          setLoading(true);
          setLoaded(false);
          setError(false);
          Logger('AD', 'IN VIEW', 'Loading ' + index);
          nativeAdRef.current?.loadAd();
        } else {
          /**
           * We will not reload ads or load
           * ads that are not viewable currently
           * to save bandwidth and requests sent
           * to server.
           */
          if (loaded) {
            Logger('AD', 'IN VIEW', 'Loaded ' + index);
          } else {
            Logger('AD', 'NOT IN VIEW', index);
          }
        }
      });
    },
    [index, loaded],
  );

  useEffect(() => {
    /**
     * for previous steps go to List.js file.
     *
     * [STEP III] We will subscribe to onViewableItemsChanged event in all AdViews in the List.
     */
    let onViewableItemsChangedHandler;

    if (!loadOnMount) {
      onViewableItemsChangedHandler = DeviceEventEmitter.addListener(
        Events.onViewableItemsChanged,
        onViewableItemsChanged,
      );
    }

    return () => {
      if (!loadOnMount) {
        onViewableItemsChangedHandler.remove();
      }
    };
  }, [index, loadOnMount, loaded, onViewableItemsChanged]);

  useEffect(() => {
    if (loadOnMount || index <= 15) {
      setLoading(true);
      setLoaded(false);
      setError(false);
      nativeAdRef.current?.loadAd();
    }
    return () => {
      setLoaded(false);
    };
  }, [loadOnMount, index]);

  return (
    <NativeAdView
      ref={nativeAdRef}
      onAdLoaded={onAdLoaded}
      onAdFailedToLoad={onAdFailedToLoad}
      onAdLeftApplication={onAdLeftApplication}
      onAdClicked={onAdClicked}
      onAdImpression={onAdImpression}
      onNativeAdLoaded={onNativeAdLoaded}
      refreshInterval={60000 * 2}
      adChoicesPlacement='topRight'
      style={{
        width: 325,
        alignSelf: 'center',
        backgroundColor: 'transparent',
      }}
      videoOptions={{
        customControlsRequested: true,
        clickToExpand: false,
        muted: true
      }}
      mediationOptions={{
        nativeBanner: true,
      }}
      repository={type === 'image' ? 'imageAd' : 'videoAd'}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: !loading && !error && loaded ? 0 : 1,
            zIndex: !loading && !error && loaded ? 0 : 10,
          }}>
          {loading && <ActivityIndicator size={28} color="#a9a9a9" />}
          {error && <Text style={{color: '#a9a9a9'}}>load failed</Text>}
        </View>
        {media ? <MediaView aspectRatio={aspectRatio} /> : null}
        <Description>
            <LeftContainer>
                <AdBadge
                    style={{
                        width: 25,
                        height: 19,
                        borderRadius: 4,
                        backgroundColor: `${colors.l_main}`,
                        borderColor: `${colors.l_main}`,
                        display: 'flex',
                        alignContent: 'center'
                    }}
                    textStyle={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: 'Pretendard-Regular',
                        textAlign: 'center',
                    }}
                    allCaps
                />
                <HeadlineView
                    style={{
                        fontFamily: 'Pretendard-Regular',
                        fontSize: 12,
                        color: isSetGap? `${colors.black}`: `${colors.white}`,
                        lineHeight: 19
                    }}
                />
            </LeftContainer>

            <CallToActionView
                style={[
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                },
                Platform.OS === 'ios'
                    ? {
                    backgroundColor: isSetGap? `${colors.black}`: `${colors.white}`,
                    borderRadius: 100,
                    }
                    : {
                      width: 45,
                      height: 33
                    },
                ]}
                buttonAndroidStyle={{
                    backgroundColor: isSetGap? `${colors.black}`: `${colors.white}`,
                    borderRadius: 100,
                }}
                allCaps
                textStyle={{
                    fontSize: 13,
                    textAlign: 'center',
                    color: isSetGap? `${colors.white}`: `${colors.black}`,
                    fontFamily: 'Pretendard-SemiBold'
                }}
            />
        </Description>
      </View>
    </NativeAdView>
  );
});

const Description = styled.View`
  display: flex;
  width: 100%;
  height: 33px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
`
const LeftContainer = styled.View`
    display: flex;
    align-items: flex-end;
    padding-left: 29px;
    justify-content: flex-start;
`
