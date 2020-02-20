/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNSplashScreen.h"
@import Firebase;
//#import <Crashlytics/Crashlytics.h>
#import <FirebaseCrashlytics.h>

@implementation AppDelegate

  NSString *filePath;
  NSString *appName;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"SarvikaED"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];
//  [FIRApp configure];
  
  
  #ifdef DEBUG
    appName = @"SarvikaED Beta";
  #else
    appName = @"SarvikaED";
  #endif
  [FIRAnalytics logEventWithName:kFIREventSelectContent
                      parameters:@{
                                   kFIRParameterItemID:[NSString stringWithFormat:@"id-%@", appName],
                                   kFIRParameterItemName:appName
                                   }];

  #ifdef DEBUG
    NSLog(@"[FIREBASE] Development mode.");
    filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist" inDirectory:@"Debug"];
  #else
    NSLog(@"[FIREBASE] Production mode.");
    filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist" inDirectory:@"Release"];
  #endif
  
  NSFileManager *fileManager = [NSFileManager defaultManager];
  if ([fileManager fileExistsAtPath:filePath]){
    FIROptions *options = [[FIROptions alloc] initWithContentsOfFile:filePath];
    [FIRApp configureWithOptions:options];
      #ifdef DEBUG
          NSLog(@"[FIREBASE] GoogleService-Info file found at path- %@ of Debug.",filePath);
      #else
          NSLog(@"[FIREBASE] GoogleService-Info file found at path- %@ of Release",filePath);
      #endif
  }else{
    #ifdef DEBUG
      NSLog(@"[FIREBASE] GoogleService-Info file not found at path- %@ of Debug.",filePath);
    #else
      NSLog(@"[FIREBASE] GoogleService-Info file not found at path- %@ of Release",filePath);
    #endif
  }
  
  //assert(NO);

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
