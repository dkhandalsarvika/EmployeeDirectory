package com.sarvika.employeedirectory;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // Import this.
import android.os.Bundle; // Import this.
import com.google.firebase.analytics.FirebaseAnalytics;


public class MainActivity extends ReactActivity {

  private FirebaseAnalytics mFirebaseAnalytics;

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        // Obtain the FirebaseAnalytics instance.
        mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);

        // //FirebaseAnalytics
        // Bundle bundle = new Bundle();
        // bundle.putString(FirebaseAnalytics.Param.ITEM_ID, "1");
        // bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, "MainActivity");
        // mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_CONTENT, bundle);

        // // Force crashing
        // throw new RuntimeException("Test Crash"); // Force a crash
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SarvikaED";
  }
}
