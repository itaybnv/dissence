import React, { Component } from "react";

import { Card, CardPrimaryAction, CardMedia } from "@rmwc/card";
import { Typography } from "@rmwc/typography";

export default class DissenceVideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTitle: props.videoTitle ? props.videoTitle : "video title",
      channelTitle: props.channelTitle ? props.channelTitle : "channel title",
      videoThumbnailUrl: props.videoThumbnailUrl
        ? props.videoThumbnailUrl
        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABVlBMVEX+/v79MTIAAAD///8hHR76MjK5ubns7OweHh77///BwcH8+//9//j3///29vb6/P/a2tr67OkYGBg6OjrU1NT+KyzwPEDuLyeDg4Nra2tGRkYqKirua3DvNyypqan6MTf/7u56enoQCgzyIB3rwsDqY2BRUVFbW1vj4+P2MyrxOUdBPj+Li4v/KzXIyMjumZXwurP7397tkZv9IR71d3Hzyr6enp6VlZVwcHD7LTv1//cWEBLtqKTwyM7/KikzMzP1ur/jUFL1gX7ro5fu4Nju0cz34OPmlIjpioP0XF3tTU76trX2++3tODjtSFHqYWnwxLXmLTTgbW72T1XeRkfqwsrmbHfneG3gXlf21MX1qa7wUEbyOUftXVv/8//hOSnks7reWFPje3/YU1zmq6D0DQfgkp3Xn6r0j4n26939w8DoZHH4qZ7XSDzkysDZNDfpgnjbsaukQK9CAAAWU0lEQVR4nO2d+VciSbbHE6JSTHNB0BBRMRFcSItFtN0Q07KqdaossRqrphe7p6bb6devrXnz7Pn/f3mxZkYuCCJg8ya/p84pCXKLDzcibtxYUpIiRYoUKVKkSJH+PykpSRqSL1V15aaRVHSsgkRS+P//adKREIdGo6E3vPKlIbgSQ6j8J8ECKLO6QiWYEvqU9FhWUvyoU3FKAIBnzcPwBAJSVMMwUqnU11hnZ2e7u998sxXUN7u7u6vo66/r9fPzFJYhKcGrPXf+BiNsCElkD0bqvH52dry11Wz+5e3rpbW1tXfvLi7mkEzTlGOxGESyvSoWbRsnWzIRPvji4uIdOnfp9eu3zWbz/SriWCf8dF2V9OfO7FP1GZWty93ttR/nWjmriAVlAgYiQDHMgP3XmxhVfDa5WNHK5Fqtqw+1bwyMa8yl66lXV20YM6kODw9NL6hYz7D4gfh/KwbRpQ5lelVoQ/uqedl47sw+UYpy9gti42ZUzuVMufI4kxKQOueYpnC6ZcnmDjxdHecmsqHqjWYbmrHRCFo1bXxLoqI0msVYrDIiWMjcthtja1uK1mzbuZbcPZ8DEjSbz53nvqXXN235sAJHxUpuwfauMoYlERcH5doeFScu6+JS1caxKILV9siMikmW4a/j6ZqCPyDyh0YMyz41hp6vYBfrib0uVUuez0HqI4X0ZJAsaBVx/jpkm58COx0RelYsljsecik0pqpEUwmHDZhmSaX+cKmafswL4celpaUPfqGUtY8PwJq7vkbHLF23HgMLyfp52FVWnGnfIWMssKSpPmE1kk1Wvcs1TWvoIWqc7XTMs72k4aiVXv9kP6riM+3tgVEJF1gpTGKlN3ixA6XJNElZTPQLS63xtrCmqyHdNlXV/voArG91fI5en7MfZVnmznX/HHoSmI1PTr5AmkzwlIk4/vzi6KDPSktXte+YSdg13R87xtIUZbXYEQRcIl0XkJrLPYZVzIS/5Pt74l4FpMU0hjUZr3LLmi8QWPHlPmFpkva9ACvEU0SwjgcPS4b350MOBYL9OLGswjy9ETAWjgisF32WQmRaqYuusIZgWajLczbkGh6XQ4wmvcA+l6hhHW30/Svp521fMXQDKPSvoVgWtODqsJtDYyFNLWma0AHLuMqanIzv9Q/rB05CrkmfG4YhGdRdVJNKHsPTNFTBDx6WCW+GHZFH5VCso1DzSGClp/u9saZsOWbz49LaV2tI1ylSGvXU9RrVuwcy3TcsuzZ0WNMUVoG2fsZMmpZKo29Y4FcHlkXjyHb7Dg/9SXr+no5DPORB9V1nmTtvhz7WY6zTGv0lLisIHWkcC+Un3LfmFEOTOuGwnWKwrmgQ3u+bk498WEKEhY4MK68QesLODJb9nTR009pjpjWL77QcZ55E39fTwe9Ff+YyBJYi5X8STYpn1wm4y37LQomVw8qh34RyFh60ML20rMPY3/ouDj2rRC0LV+kAHBQwrPSi2IMHUm+/GD1IV5cCwSwH1iaHhelUWNyZZbpSqQRgoaRcy18cEcGYZVnoBA+tQ/kiP3TLkjYIraOs66MWHPcdAGAkSqWSIYVFJkI+SPrnDz3AMiEd/aOwbPxnphgshtbff7y4OLS9hRHC1v3Hj5tzGU9/CB7Km0OHhb0F4mqhziDyuqiVTTh3nZ1/eYR61Ysby0JgopQ9ICJJYI98yjJnI6ldBWJZFJaUTHFY8OIV0XtoybgLTD+9hiKsllW5ePNDSkqd38ZyfKDItKzKae0sj+ra/JffryrQ4t+gCrJVHzYr3HUm/cP4FOD11xHvKSZW4gXqhx3FZ5wwBGoGCkdHR4U0ieKAlTj6cBRfoV+rl3M9wFojs2FAqmiZlllcJddR3giwlPph+7beaCiocsi/cQeK4NyN0dBVbMlK43y7Dd2CHcvU8SSlIdPaoGWvDAArkeus75N4SeERpVGtBjgs0vmeZLCI01/gsO4Oe4GFfHuULxFWUql5YG3WDJ0OQiQbSxnO6tOxntT5VC1VuplzyrwcKx6PABbx2l+k1yXD14meOXohipfOAcD6Xtd0lF0ES8awaC9IhCUl3lyiniU5T9LrbW5Xx7rKIxlJpaHozYwDS0awhj5kAUpp2plO8CqrxLx5ble0nL5Ip0vdYek/WAFvksFyK3hkWdgGPMVQ8cKStIYm0emBqn55jZtMy878jGfMoP5SEk/gwkPfyrc2q/3lmP1KH7plSaz0xSf2SLaPXgIBCa6u4gUa9GJAHoSl7BY7WdajYKl4NhGzFEXbxrOPYvYveQRLS+q6ouCIKw41nkHWVqKvb/Tk8GHRcng0v04q8wKNMYMyq+3Xlyfm05QODZ92gxVwuh+EBUNhKbp2tv1tLYUqeElR9RvkV5jQaipAUTRdPX57W6urOq7OlDVI20oMSxv+SCsoUSwnrGqapbBoPOJo3UBNzwTtX9PA/MOwVuEgYElq875iF7/HrpOm6scEVq6O6nbF0FdbO3bxH+e41lOVX2GGwYI3SnLYrDAXoRpPn1D3vUQrKjZwQXuQ1OgY3A511vtgLznglHYvhsjPyiAPHn91KSmgjj7Y8CqF76Cpa7gJhDUyiQ2cZWxW7mGt8Xn4tLh/RcSCpqDKKipa8vZpdXYweFjhlkW7O2bsN1RhMVhQ/kBjifk2cfU/4DniEqi3uScPtxvqCGBNC7CYKYEp4tizYA0bxzjakLrCag7IshAs05RvUWcTfVWXESxziYwVsTirfZXXyYGbkLms8LahDn8MHwDaJ3zhmhLvBR2tSxQWtawFoxsspRmcFNK/ZcElgxS2eqaC6qRbXYBlbaZwWwmMK/7rwNf6KObigvkCh4VKWigsanszPcAKRGj6tixkPl+pxHtAsExzZ5vE8JPH9A6bqSTuMhmnHJb9eiRzQ1iZI6WQue8+WFNDg/WAZXWERaaYbpKrPgOshGNZaTbHAVX6QVjp54aF/07+9b+KEMLiHGkbRw8LuQZskIdW4R1hvUx0hzW4Ch59+op2BTEsmcGSzn/bRvrtv/McFm8NXyvD7xziW5YLzHHgY2D9W9bgXAcMKxmAxZf/0KVPQHJg2aOp4J0KnIXiO8IatWXZIZaF1z6hjjRb+STC+l0fyUxJ3uN58dJ4umV16O70WWcFYCUlsgQRd7VBANZILIvBSj8ZFvj3I2Fxy5J6haVLpLvMF9kZ/9rhfcPfgBI2bee5YHUvhmAVdgjRdLGsnmEZqGZSXKls0s6fD1YPxbBjiGZQsNSvt2uCtn+0WDxrNFGHgVrWWbFDpHRQxTC5SkbRbLomEVo2Dc3ieNafC1Z3y1K/rgzcsnDUQXAdjtlwIx3LhpbFVuYVfx7N6rDBWZb6dXB6wlMtS1E8lsX6hs5qTSoE69VollgMzrKkO/NxxbAXy5JCLMs8zOUymUwuY5oVBmvYM+E7wwrrSKdfdi+GRqehsCdYFoNVEy1LPt1dXf2C/l3EmOsQe25Y6ccWQ8mY6z7XoS/LMr2w7HcKWY2fPLVZBW8Of/j+UbB8wT8pCEs1LgboZ0Ghgjd33orxLPtUk2g8i8GCI5jr0AnWBAsri8E/VCi7wtLfDdYpVVxYtyIs+I5suqIwWKhZ/PH5YFVpPPCExuDpkMZRNmTA4uDI45SqS50ns4mw8Kn5ooU9gN0gLOUczy8xY7cNRVdV3BrKJvyKDljUDy3UCu58p+rEsq7osvWKdZp/NljTNCwfJ1NxQZaaz3wAFo+hOgMW0tueYJH4eaotmzF4awRh6ak55GvCYrOBO4EIlolM55RE3VXjaieXi9lvadQh8RO5JIL1YeiL6DrBkoxFZzkBANPkWxZz5oOsOJwDqjwQxi1LqfVuWWq7Umn/M0VDBV7LSn3ImBV4X2+QxbHHuDW0zDqBpTczFXTeMR03rJukQclVrCXgz9bIYDFjmozvJ4xZNp/maNoD68BI7PNBNKc11P+nZ1iS/ntrbtug8T0vLFW/fHPR+rSq6FID1VSvLAQrA1/he1yqRm2u9a8tLUkGLLZkMsiaqxRfPyOsKR4PjBfidK4DbxoTwpSRFz5YmvYlEP0LwrrS2AifoQJVJz06RfcM32sKUD/TmQvK50YNyrFKzr7Ok5FBAFR0HrmfLn1vQmxalmw3nxGW9NI7PQsZGZ2gBRKLQurRoteylLqfVQgsOuZHpOrGZxCElWzoKj9GbdzifmAGoqLnWWimqzoqoOSSlgzfPx8sic8wdRRn83IBnztPElfmPa0hSKZaHWE5U7tbdbrbjqIrycvfVkNgna+SqBW5pnq3SfvMcC2lsOVA5BtNza/ZcgV78NCUh752x4U16YfFpyI5BW2BtzZ8NhIF6IUlSc6qMC6YSxGPSHdnK8P3yG4UCW8kJr0xt3DeOax/SnjvMaX+jy94ehap0aUtM0a3ntn5I6/jgQqy9xg6O39bgbJMujvm0FeFibDIAlYPLOSK0pWu+Jt41mmZwXQhzRL3+WpYB5ZmrPn6O7B9p1NYV/wb+5e7pEpY5W8zxf/FsFQG61s8VU3Rz+futzTsYGiafvbJmYCbua7T3e9QMjr5uuh8k9tMjYYVbuCoTjyrFEBpBaUVCoV4fGZCWDqAKKJaPx5fx87DCj3TgaW89sO6P/ucSqXy+fo9tyzr8PZOQVSM91fQzmzhndryd3/JkGKYyuN92I7n7PZtHc/wA7tXTojMhPDvtToqvBho/eaT5e4OlLsYRUiZymDypgJgVPfK8/vL0969C0BiuTy/TJeOec/UkT/gg1Vp3d+bptm+v3dCXZZsfnr75s0f9zIqpLDNNtnCViLL9/d4h6w29tLba7Xm9j9RFc6jPmbMRoZ6entzc7O9htc1usGz3Noot9HqtJ1D+D4PniUWQrom6U3/8iQZMrkrnORKhW/eILMwHlvv5ByLo+r2TrEoriHDG2hZOHlnB52MkLubbFXejt8ObQjWrtlx14YhqvJ+DLei0XFzGIzDD1uoZzR+m9GoDUn5IzN6WDvfj2RSyMAFzlqdF4wPRXj/xVfjZ1hYQLt+3G4fT4cF4akxnrAkvX41UlYx2W6f6WMKS9W3Mt1zOEDZGbwSZSzrLARL+3fGtkMXgw9cOSsWa78Zyy3siPCCrq1724r5V8gPQ8h1bd1cJj+PKD4zcGmaojfq1xlrFLZlt6+/aMrwl4MNSzRSbnz5WxvPdKE/PzMD1gsMWAffPZnsLCxu/MCM08Rr7V32ZNUAmRECr98b41q3CwLK5Q+/frW52W4jL4guti+iPt1O0bJtSkHOMeH8Q48QCQt/g7vTJJJlZcjJO0WuDLrq1VLzh89g/FFJJAyKiqNipO7qZ1++vHp1c1Or/XF9ff3h9GqOiEcbSGgvk8lYLizSZcZqtVroyJ8+fny3dn393dtarXbz/tXqWf3uzsAvb8Aa19rKLw3PLU7iQqnTsgIUoPPoHXvbANIq0q5X+CUDWKlU6pK96ULBkxsU8u4LlU5ZxuFSXRr/zfOxFP4KFL5vlqd9x+Fh92UNROLbG/BHnJJ0ZvPh2LPmxOCFd3+MrdsQKVKkSJEiRYoUKVKkSJEija+CL0/0vEYx7N0e3rSuR3R4MWMgudMjdLqxJ61Tth5K7XDqA0pMdFQCSIB9PStc0psGpukn8eUfnjRQcq8ozt8Skumig6rv9lPV2ZLhyQs/XHx+dpafCkue8qYaLJU++VToqQ+pGu+oKsCTRonmPSjEqWlgL/jyD542wdb0OBKY8wluWGzRQcgjzMy7PwIwFv2vHkFaJ0lpnwkaafHSTnKCXZU+Obtc77BA/7DmO8NaFtJEWOIW8ie9wBLPAcZMCIENkrLogzXBz94Pg7VAn3zmzw1rwT1o2k19GJZzbxfWhlA4w2Ft8JM9czqfDGt2lLDiCf8hPcByNlVyYMUn3HuFwQIl9+SpQcIaqWW5R7m/fXdYaba3mQur4NpLKKx99+SsmP5EWFKiyjRbpueWZ3lKYvCwDpwitdgJ1gS7/9REmR+z54flzHvuACstXFxopp8My3VvWKW47HGzBgyLVyHe0u+BVXKdrAR7z1ZW8sNy29UQWN7Ssj9IWM6VHFhi4uBgLbhcyAIMpMJMKKxArtniKRHWDHfZwmDRtPQk+33GEBYt5dwRIO7R4koXWAma34UgLOdCQVi8ej8IPNn4wJogNRB7sxHNz8Zeb7DoVnBeWPFSR1j8iRia7BjCmqUwEsK9Jva7wGLFcD9QwRMGIBwWc3cXDbDuu+KIYJXFzm2fsJaFNFr+SuGwAhV8KQwWu2MAFic87zRZ+yOGla0KWu4PFmWMG31gkB8/DcJgzSaISqXZvRP+S0kirHWGkNbcQVgH7DpAMuhfhRHDCtMjYVWp9zODnAdmmwegHAIroA3DC+uAewb7uCD6YYEEdbLwykfeWefPNk6w6E+OyhQ7Z6InWCvOzggMVtY5cjoMFrs3bi3502+MIawJ5/qsru8F1kwVBGDxrh/enMQPi78wljaWjAffhXZsYM2yR83yumQRhNZZAa3zrDqw+D3xs/pgeY2JH7g/frBYtM1g7VW5R1i8byPA4vlE1/LDYtUU2wSA2eCiNEpY2eqUK29rKILpAouWuir7fyoc1kqZaiW7wDvSbHd+B5b7Gx74YPHqfdJg3kdWfLrn97MeAWuKXeuEWUUorIR7I2NikgH0wXKD0tWsFxbLRDZRoh4Ie5LsKGE94MGz08S4P4cw64NFX+C9SKusDSkclujBO4vYE35YrCMUX/AVQ+a0B0THTp4d1lTwNN7KBWDRrFBE+P1/XWB5PSURlhBlF2GB6XgH7f85YM0KT8OPOBB/zimHCINDq5VpqRdY7KH2/LC8oVYHVrkTLOLuPz8s1uBkxSOYr2P4YElC2zppOM5pD7D2g7A8RsSLYSdWzDafHVaiQD6lhZcb8meW/LAMN95L+ojdYZXdh/LC8gTaGSxf2fQIBymeHZbjMruH8GysB2AJvtREL7C4J0BqPz8s42UAFqves2VRBee6zw8LzLMHLjPfRuKjXPueFoDAcgfASp1gia5DleVnktQ4Xlie4D6B5XSDDNHR4ZXbfkdYfg0TllN5zOxVp6dnl52at+TJE4HlDOiRFxuFwsquMB1sOKZT9vtZ9MoHPliszB5488Xuv4gQhsKaX/FqvgdafcMSZy2I4rtlCbAkJ35Ht1EMgxUi9rJSPyyJVZcMljO8NuXJLZDSPDkcll+LQ4QViGAynSS8sNgmnOzb6mNgsY5eAJZbqgks14S8GWP1xEaPsE6GCQv9wifBWy6W+OEiLIndpFASM/u44XvBSXHyS2BtBJ+VyOkGDBDWct+wgDTvv+OKM7PKa1ms0qLvv+3Jshacl7HQYLQHFueAYDn14bQ/s6wviqr4QRbDNFIAFkkse2EF00rzgnUtrggPjGCRwyksab2AP7AB+WXyVWGaldC0K7yT2+LJzHp51mmdkK9Ajva4v2V60gnxcMnX64E3trPbpBcRLPIH+6kWCukwzfQCy6D9dO++a2GJEkvznA2MUnViD2l5atozX8+5BP3kOZd9JX7jyjAMX0ueEA6XPFfAD+j+1SFnCecKQLxcQD05Xv14Z+LpD/kpPTkv3U7ozQXq8+6RIkWKFClSpEiRIkWKFClSpEiRIkWKFClSpEiRIkWK1EH/B9hxadIbhfBYAAAAAElFTkSuQmCC"
    };
  }

  render() {
    return (
      <Card style={{ width: "200px", height: "200px", margin: "3px" }}>
        <CardPrimaryAction>
          <CardMedia
            sixteenByNine
            style={{
              backgroundImage: "url(" + this.state.videoThumbnailUrl + ")"
            }}
          />
          <div style={{ margin: "0 10px 10px 10px" }}>
            <Typography use="headline6" tag="h2">
              {this.state.videoTitle}
            </Typography>
            <Typography
              use="subtitle2"
              tag="h3"
              theme="textSecondaryOnBackground"
              style={{ marginTop: "-1rem", marginBottom: "5px" }}
            >
              {this.state.channelTitle}
            </Typography>
          </div>
        </CardPrimaryAction>
      </Card>
    );
  }
}
