import { css } from "@emotion/css";
import React from "react";
import { useGlobalStateContext } from "../../contexts/globalState";
import { buyTrack } from "../../services/Api";
import {
  calculateRemainingCost,
  formatCredit,
  calculateCost,
} from "../../utils/tracks";
import Button from "./Button";

export const TrackPopupDetails: React.FC<{ track: TrackWithUserCounts }> = ({
  track,
}) => {
  const {
    state: { user },
  } = useGlobalStateContext();
  const onBuyClick = React.useCallback(async () => {
    if (user) {
      await buyTrack(user.id, track.id);
    }
  }, [user, track.id]);

  return (
    <div
      className={css`
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        `}
      >
        <img
          src={track.images.small?.url ?? track.cover}
          alt={track.title}
          width={100}
          height={100}
          className={css`
            margin-right: 1rem;
          `}
        />
        <div>
          <p
            className={css`
              font-size: 1.1rem;
            `}
          >
            {track.title}
          </p>
          <p
            className={css`
              color: #444;
              font-size: 1rem;
            `}
          >
            {track.artist}
          </p>
        </div>
      </div>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <p>
          You're <strong>{9 - track.plays}</strong> plays away from owning this
          song
        </p>
        <Button compact onClick={onBuyClick}>
          Buy now
        </Button>
      </div>
      <div
        className={css`
          margin-top: 0.75rem;
          display: flex;
          justify-content: space-between;

          dl {
          }
          dt {
          }
          dd {
            font-weight: bold;
          }
        `}
      >
        <dl>
          <dt>Total remaining cost</dt>
          <dd>
            {calculateRemainingCost(track.plays)}{" "}
            <small>
              (€
              {((calculateRemainingCost(track.plays) / 1022) * 1.25).toFixed(2)}
              )
            </small>
          </dd>
        </dl>
        <dl>
          <dt>Current stream</dt>
          <dd>{formatCredit(calculateCost(track.plays))}</dd>
        </dl>
        <dl>
          <dt>Next stream</dt>
          <dd>{formatCredit(calculateCost(track.plays + 1))}</dd>
        </dl>
      </div>
    </div>
  );
};

export default TrackPopupDetails;
